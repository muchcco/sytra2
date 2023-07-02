<?php

namespace App\Http\Controllers\MesaPartes;

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

use App\Models\User;
use App\Models\Lugar;
use App\Models\Oficina;
use App\Models\Tdtipos;
use App\Models\Empleado;
use App\Models\Folioext;
use App\Models\Archivoext;
use App\Models\Logderivarext;
use App\Models\Logarchivados;

class AccionesController extends Controller
{
    public function storenuevo(Request $request)
    {
        
       try{
            //SE CREA EXPEDIENTE POR AÑO Y MES
            // dd($request->all());
            $año_act = Carbon::now()->format('Y');
            $mes_act = Carbon::now()->format('m');  
            
            // AGREGAMOS EL SELECT MULTIPLE
            // INCREMENTAR N EXPEDIENTE
    
            $entrada = Folioext::select('exp', 'año_exp')->where('año_exp', $año_act)->orderBy('exp', 'desc')->first();
    
            if(isset($entrada->exp)){                
                $codentrada = $entrada->exp + 1;
                $codexp = Str::padLeft($codentrada, 8, '0');
            }else{
                $codexp = '00000001';
            }

            // OBTENEMOS DATA DEL USUARIO

            // $oficinas_get = Oficina::join('lugares', 'lugares.id', '=', 'oficinas.lugares_id');

            // $usuario = Empleado::select('oficinas.nombre as ofi_nom', 'lugares.nombre as lug_nom')
            //                     ->join('users', 'users.empleado_id', '=', 'empleado.id')
            //                     ->joinSub($oficinas_get, 'O', function($join){
            //                         $join->on( 'O.id', '=', 'empleado.oficinas_id');
            //                     })
            //                     ->where('users.id', auth()->user()->id)->toSql();
            
            // dd($usuario);

            
            $save = new Folioext;
            $save->exp =  $codexp;
            $save->año_exp = $año_act;
            $save->mes_exp = $mes_act;
            $save->asunto = $request->asunto;
            $save->pago = $request->pagos;
            $save->cabecera = $request->cabecera;
            $save->firma = $request->firma;
            $save->nfolios = $request->nfolios;
            $save->fecha = Carbon::now();
            $save->user = auth()->user()->id;
            $save->empid = auth()->user()->empleado_id;
            $save->c_oficina = $request->nfolios;
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
                $log = new Logderivarext;
                $log->tipo = 0;
                $log->forma = 0;
                $log->obs = '';
                $log->user = auth()->user()->id;
                $log->empid = auth()->user()->empleado_id;
                $log->fecha = Carbon::now();                
                $log->d_oficina = $arreglo[$i];                
                $log->folioext_id = $save->id;
                $log->save();                
            }
    
            //esructura de carperta
    
            $estructura_carp = 'archivos\\folioext\\'.$año_act.'\\'.$codexp;
    
            if (!file_exists($estructura_carp)) {
                mkdir($estructura_carp, 0777, true);
            }
    
            if($request->has('filer_input'))
            {
                foreach($request->file('filer_input') as $archivo)
                {
                    $archivoName = $codexp.'-'.$archivo->getClientOriginalName();
                    $archivo->move(public_path($estructura_carp), $archivoName);
    
                    $archivo = new Archivoext;
                    $archivo->folioext_id = $save->id;
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


    public function deletederivado(Request $request)
    {
        $deleted_lg_derivar= Logderivarext::where('id',  $request->id)->delete();

        return $deleted_lg_derivar;
    }
}
