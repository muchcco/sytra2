<?php

namespace App\Http\Controllers;

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

class ExternoController extends Controller
{
    public function mesa_partes(Request $request)
    {
        $td_tipos = Tdtipos::where('ext', 1)->orderBy('nombre', 'desc')->get();

        return view('mesa_partes', compact('td_tipos'));
    }

    public function store(Request $request)
    {
        try{
            $validated = $request->validate([
                'n_documento' => 'required',
                'ap_materno' => 'required',
                'ap_paterno' => 'required',
                'nombres' => 'required',
                'telefono' => 'required',
                'correo' => 'required',
                'direccion' => 'required',
                'n_doc_envio' => 'required',
                'n_folio_envio' => 'required',
                'asunto_envio' => 'required',
            ]);            
            
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

            // OBTENEMOS LA CABECERA DEL DOCUMENTO

            $tipo_documento = Tdtipos::where('id', $request->t_doc_envio)->first();

            $name = '';
            $explode = explode(' ', $nombre);
            foreach($explode as $x){
                $name .=  $x[0];
            }

            $cabecera = $tipo_documento->nombre. 'NRO.'. $request->n_doc_envio.'-'.$año_act.'-'.$name;


            $save = new Folioext;
            $save->exp =  $codexp;
            $save->año_exp = $año_act;
            $save->mes_exp = $mes_act;
            $save->idestados = 1;

            $save->t_persona = $request->t_persona;
            $save->ruc = $request->ruc;
            $save->r_social = $request->r_social;
            $save->t_documento = $request->t_documento;
            $save->n_documento = $request->n_documento;
            $save->ap_paterno = $request->ap_paterno;
            $save->ap_materno = $request->ap_materno;
            $save->nombres = $request->nombres;
            $save->telefono = $request->telefono;
            $save->correo = $request->correo;
            $save->direccion = $request->direccion;
            
            $save->td_tipos_id = $request->t_doc_envio;
            $save->cabecera = $cabecera;
            $save->nfolios = $request->n_folio_envio;
            $save->asunto = $request->asunto_envio;

            $save->fecha = Carbon::now();
            $save->aid = 97;

            // $save->file = $request->filer_input;
            $save->save();

            $log = new Logderivarext;
            $log->tipo = 1;
            $log->forma = 0;
            $log->obs = '';
            $log->fecha = Carbon::now();                
            $log->d_oficina = 97;                
            $log->folioext_id = $save->id;
            $log->save();  

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
                    $archivo->tipo_log = 'folioext';
                    $archivo->folioext_id = $save->id;
                    $archivo->nombre_archivo = $archivoName;
                    $archivo->ubicacion = $estructura_carp;
                    $archivo->save();
                }
            }

            return $save;

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
}
