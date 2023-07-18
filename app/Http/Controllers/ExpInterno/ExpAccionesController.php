<?php

namespace App\Http\Controllers\ExpInterno;

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
use App\Models\Folioint;
use App\Models\Archivoint;
use App\Models\Logderivarint;
use App\Models\Logarchivados;

class ExpAccionesController extends Controller
{
    public function storenuevo(Request $request)
    {
        
       try{
            //SE CREA EXPEDIENTE POR AÑO Y MES
            $año_act = Carbon::now()->format('Y');
            $mes_act = Carbon::now()->format('m');  
            
            // AGREGAMOS EL SELECT MULTIPLE
            // INCREMENTAR N EXPEDIENTE
    
            $entrada = Folioint::select('exp', 'año_exp')->where('año_exp', $año_act)->orderBy('exp', 'desc')->first();
    
            if(isset($entrada->exp)){                
                $codentrada = $entrada->exp + 1;
                $codexp = Str::padLeft($codentrada, 8, '0');
            }else{
                $codexp = '00000001';
            }            

            // OBETENEMOS EL CODIGO DE OFICINA DEL USUARIO LOGEADO

            $c_oficina = Empleado::join('oficinas', 'oficinas.id', '=', 'empleado.oficinas_id')
                                    ->select('empleado.*', 'oficinas.id as id_oficina')
                                    ->where('empleado.id', auth()->user()->empleado_id)
                                    ->first();

            $save = new Folioint;
            $save->exp =  $codexp;
            $save->año_exp = $año_act;
            $save->mes_exp = $mes_act;
            $save->asunto = $request->asunto;
            $save->num_doc = $request->n_doc;
            $save->cabecera = $request->cabecera;
            $save->firma = $request->firma;
            $save->nfolios = $request->nfolios;
            $save->fecha = Carbon::now();
            $save->user = auth()->user()->id;
            $save->empid = auth()->user()->empleado_id;
            $save->c_oficina = $c_oficina->id_oficina;
            $save->obs = $request->obs;
            $save->aid = $request->d_oficina;
            $save->td_tipos_id = $request->td_tipos_id;
            $save->urgente = $request->urgente;
    
            //guardamos el select multiple
            $save->aid = $request->d_oficina;
    
            // $save->file = $request->filer_input;
            $save->save();
            //dd($save->id);
            // GUARDAMOS LOS ARCHIVOS

            $oficinas = $request->d_oficina;
            $nuevoString = trim($oficinas,"{ }");
            $arreglo = explode(",",$nuevoString);

            for($i = 0 ; $i < count($arreglo); $i++){
                $log = new Logderivarint;
                $log->tipo = 0;
                $log->forma = 0;
                $log->obs = '';
                $log->user = auth()->user()->id;
                $log->empid = auth()->user()->empleado_id;
                $log->fecha = Carbon::now();                
                $log->d_oficina = $arreglo[$i];                
                $log->folioint_id = $save->id;
                $log->save();                
            }
    
            //esructura de carperta
    
            $estructura_carp = 'archivos\\folioint\\'.$año_act.'\\'.$codexp;
    
            if (!file_exists($estructura_carp)) {
                mkdir($estructura_carp, 0777, true);
            }
    
            if($request->has('filer_input'))
            {
                foreach($request->file('filer_input') as $archivo)
                {
                    $archivoName = $codexp.'-'.$archivo->getClientOriginalName();
                    $archivo->move(public_path($estructura_carp), $archivoName);
    
                    $archivo = new Archivoint;
                    $archivo->tipo_log = 'folioint';
                    $archivo->folioint_id = $save->id;
                    $archivo->nombre_archivo = $archivoName;
                    $archivo->ubicacion = $estructura_carp;
                    $archivo->save();
                }
            }
            return $save;
        }catch(Exception $e){
            //Si existe algún error en la Transacción
            DB::rollback(); //Anular los cambios en la DB
        }
    }

    public function storearchivos(Request $request)
    {
        try {

            //BUSCAMOS DATOS DEL EXPEDIENTE
            // dd($request->tipo_log);
            $exp = Folioint::where('id', $request->id)->first();

            //esructura de carperta
        
            $estructura_carp = 'archivos\\folioint\\'.$exp->año_exp.'\\'.$exp->exp;
        
            if (!file_exists($estructura_carp)) {
                mkdir($estructura_carp, 0777, true);
            }

            //ALMACENAMOS LA INFORMACION
            $archivos = new Archivoint;
            $archivos->tipo_log = $request->tipo_log;
            $archivos->folioint_id = $request->id;
            if($request->hasFile('nom_ruta'))
            {
                $archivoPDF = $request->file('nom_ruta');
                $archivoName = $exp->exp.'-'.$archivoPDF->getClientOriginalName();
                $archivoPDF->move(public_path($estructura_carp), $archivoName);

                $archivos->nombre_archivo = $archivoName;
            }
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

        $archivo = Archivoint::where('id',  $request->id)->first();

        $exp = Folioint::where('id', $archivo->folioint_id)->first();

        $base = URL::to('/');

        $estructura_carp = '\\archivos\\folioint\\'.$exp->año_exp.'\\'.$exp->exp.'\\'.$archivo->nombre_archivo;

        $archivo_pdf = public_path($estructura_carp);
    
        //dd($base.$estructura_carp.$archivo->nombre_archivo);
        if(File::exists($archivo_pdf)) {
            File::delete($archivo_pdf);
          }   

        $deleted_archivo = Archivoint::where('id',  $request->id)->delete();
        return $deleted_archivo;
    }

    public function deletederivado(Request $request)
    {
        $deleted_lg_derivar= Logderivarint::where('id',  $request->id)->delete();

        return $deleted_lg_derivar;
    }

    public function edit_logderivar(Request $request)
    {
        $log_derivar = Logderivarint::findOrFail($request->id);
        $log_derivar->forma = $request->forma;
        $log_derivar->d_oficina = $request->d_oficina;
        $log_derivar->obs = $request->obs;
        $log_derivar->save();

        return $log_derivar;
    }

    public function update_emitidos(Request $request)
    {
        $folioext = Folioint::findOrFail($request->id);
        $folioext->td_tipos_id = $request->td_tipos_id;
        $folioext->cabecera = $request->cabecera;
        $folioext->asunto = $request->asunto;
        $folioext->firma = $request->firma;
        $folioext->nfolios = $request->nfolios;
        $folioext->urgente = $request->urgente;
        $folioext->obs = $request->obs;
        $folioext->save();

        return $folioext;

    }

    public function recibir_exp(Request $request)
    {
        $recibir_exp = Logderivarint::findOrFail($request->id);
        $recibir_exp->recibido = 1;
        $recibir_exp->save();

        return $recibir_exp;
    }
}
