<?php

namespace App\Http\Controllers\ExpExterno;


use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

use Illuminate\Support\Collection;
use Illuminate\Support\toArray;
use Illuminate\Database\Eloquent\Builder;
use Carbon\Carbon;
use Response;
use Illuminate\Support\Str;
use DateTime;
use DatePeriod;
use DateInterval;
use Illuminate\Support\Facades\URL;
use File;

use App\Models\User;
use App\Models\Lugar;
use App\Models\Oficina;
use App\Models\Tdtipos;
use App\Models\Empleado;
use App\Models\Folioext;
use App\Models\Archivoext;
use App\Models\Logderivarext;
use App\Models\Logarchivados;

class BandejaAccionesController extends Controller
{
    public function storearchivos(Request $request)
    {
        try {

            //BUSCAMOS DATOS DEL EXPEDIENTE
            // dd($request->tipo_log);
            $exp = Folioext::where('id', $request->id)->first();

            //esructura de carperta
        
            $estructura_carp = 'archivos\\folioext\\'.$exp->año_exp.'\\'.$exp->exp;
        
            if (!file_exists($estructura_carp)) {
                mkdir($estructura_carp, 0777, true);
            }

            //ALMACENAMOS LA INFORMACION
            $archivos = new Archivoext;
            $archivos->tipo_log = $request->tipo_log;
            $archivos->folioext_id = $request->id;
            if($request->hasFile('nom_ruta'))
            {
                $archivoPDF = $request->file('nom_ruta');
                $archivoName = $exp->exp.'-'.$archivoPDF->getClientOriginalName();
                $archivoPDF->move(public_path($estructura_carp), $archivoName);

                $archivos->nombre_archivo = $archivoName;
            }
            $archivos->ubicacion = $estructura_carp;
            $archivos->save();

            return $archivos;

        } catch (\Exception $e) {
            //Si existe algún error en la Transacción
            $response_ = response()->json([
                'data' => null,
                'error' => $e->getMessage(),
                'message' => 'BAD'
            ], 400);

            return $response_;
        }
    }

    public function eliminar_archivos(Request $request)
    {

        $archivo = Archivoext::where('id',  $request->id)->first();

        $exp = Folioext::where('id', $archivo->folioext_id)->first();

        $base = URL::to('/');

        $estructura_carp = '\\archivos\\folioext\\'.$exp->año_exp.'\\'.$exp->exp.'\\'.$archivo->nombre_archivo;

        $archivo_pdf = public_path($estructura_carp);
    
        //dd($base.$estructura_carp.$archivo->nombre_archivo);
        if(File::exists($archivo_pdf)) {
            File::delete($archivo_pdf);
          }   

        $deleted_archivo = Archivoext::where('id',  $request->id)->delete();
        return $deleted_archivo;
    }


    public function recibir_exp(Request $request)
    {
        $folioext = Folioext::findOrFail($request->folio);
        $folioext->idestados = 2;
        $folioext->save();

        $recibir_exp = Logderivarext::findOrFail($request->id);
        $recibir_exp->recibido = 1;
        $recibir_exp->tipo = 1;
        $recibir_exp->save();

        return $recibir_exp;
    }

    public function deletederivado(Request $request)
    {
        $deleted_lg_derivar= Logderivarext::where('id',  $request->id)->delete();

        return $deleted_lg_derivar;
    }

    public function edit_logderivar(Request $request)
    {
        $log_derivar = Logderivarext::findOrFail($request->id);
        $log_derivar->forma = $request->forma;
        $log_derivar->d_oficina = $request->d_oficina;
        $log_derivar->obs = $request->obs;
        $log_derivar->save();

        return $log_derivar;
    }

    public function rec_derivar(Request $request)
    {

        if($request->proveido === "undefined" ){
            $proveido = NULL;
        }else{
            $proveido = $request->proveido;
        }

        // OBETENEMOS EL CODIGO DE OFICINA DEL USUARIO LOGEADO

        $c_oficina = Empleado::join('oficinas', 'oficinas.id', '=', 'empleado.oficinas_id')
                            ->select('empleado.*', 'oficinas.id as id_oficina')
                            ->where('empleado.id', auth()->user()->empleado_id)
                            ->first();

        //ACTUALIZAMOS A ATENDIDO EL ANTERIOR LOG DERIVADO

        $recibir_exp = Logderivarext::findOrFail($request->id);
        $recibir_exp->atendido = 1;
        $recibir_exp->save();

        //ALMACENAMOS UN NUEVO LOG
        $derivar = new Logderivarext;
        $derivar->tipo = 1;
        $derivar->provei = $proveido;
        $derivar->forma = $request->forma;
        $derivar->obs = $request->obs;
        $derivar->user = auth()->user()->id;
        $derivar->empid = auth()->user()->empleado_id;
        $derivar->fecha = Carbon::now();                
        $derivar->d_oficina = $request->d_oficina;
        $derivar->c_oficina = $c_oficina->id_oficina;               
        $derivar->folioext_id = $request->folio_id;
        $derivar->save();   

        return $derivar;
    }

    public function rec_archivar(Request $request)
    {
        try{
            // dd($request->all());
            if($request->proveido === "undefined" ){
                $proveido = NULL;
            }else{
                $proveido = $request->proveido;
            }

            // OBETENEMOS EL CODIGO DE OFICINA DEL USUARIO LOGEADO

            $c_oficina = Empleado::join('oficinas', 'oficinas.id', '=', 'empleado.oficinas_id')
                                ->select('empleado.*', 'oficinas.id as id_oficina')
                                ->where('empleado.id', auth()->user()->empleado_id)
                                ->first();

            //ACTUALIZAMOS EL ESTADO DEL FOLIO

            //ACTUALIZAMOS A ATENDIDO EL ANTERIOR LOG DERIVADO

            $update_derivar = Logderivarext::findOrFail($request->id);
            $update_derivar->atendido = 1;
            $update_derivar->save();
            
            //ALMACENAMOS UN NUEVO LOG
            $archivar = new Logarchivadoext;
            $archivar->tipo = 1;
            $archivar->provei = $proveido;
            $archivar->forma = $request->forma;
            $archivar->obs = $request->obs;
            $archivar->user = auth()->user()->id;
            $archivar->empid = auth()->user()->empleado_id;
            $archivar->fecha = Carbon::now();
            $archivar->c_oficina = $c_oficina->id_oficina;               
            $archivar->folioext_id = $request->folio_id;
            $archivar->save();

            return $archivar;
        }catch(Exception $e){
            //Si existe algún error en la Transacción
            DB::rollback(); //Anular los cambios en la DB
        }
    }
}
