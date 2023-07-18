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

use App\Models\User;
use App\Models\Lugar;
use App\Models\Oficina;
use App\Models\Tdtipos;
use App\Models\Empleado;
use App\Models\Folioint;
use App\Models\Archivoint;
use App\Models\Logderivarint;
use App\Models\Logarchivadoint;

class ExpPrincipalController extends Controller
{
    public function td_nuevo(Request $request)
    {   

        $td_tipos = Tdtipos::where('ext', 1)->orderBy('nombre', 'desc')->get();

        // OBETENEMOS EL CODIGO DE OFICINA DEL USUARIO LOGEADO

        $c_oficina = Empleado::join('oficinas', 'oficinas.id', '=', 'empleado.oficinas_id')
                            ->select('empleado.*', 'oficinas.id as id_oficina', 'oficinas.siglas')
                            ->where('empleado.id', auth()->user()->empleado_id)
                            ->first();

        $oficinas = DB::table('oficinas as o')
                        ->select('o.id', DB::raw('CONCAT(l.nombre," - ", o.nombre) as nombre'), 'o.siglas')
                        ->join('lugares as l', 'o.lugares_id', 'l.id')
                        ->where('o.lugares_id', 1)
                        ->orderBy('l.id', 'ASC')
                        ->get();

        return view('modulos.expinterno.td_nuevo', compact('td_tipos', 'oficinas', 'c_oficina'));
    }

    public function buscar_ndoc(Request $request)
    {
        //SE CREA EXPEDIENTE POR AÑO Y MES
        $año_act = Carbon::now()->format('Y');
        $mes_act = Carbon::now()->format('m');

        // OBETENEMOS EL CODIGO DE OFICINA DEL USUARIO LOGEADO

        $c_oficina = Empleado::join('oficinas', 'oficinas.id', '=', 'empleado.oficinas_id')
                            ->select('empleado.*', 'oficinas.id as id_oficina')
                            ->where('empleado.id', auth()->user()->empleado_id)
                            ->first();


        $entrada = Folioint::select('c_oficina', 'año_exp', 'num_doc')
                            ->where('año_exp', $año_act)
                            ->where('td_tipos_id', $request->ndoc)
                            ->where('c_oficina', $c_oficina->id_oficina)
                            ->orderBy('num_doc', 'desc')->first();
        // dd($entrada);
           
        if(isset($entrada->num_doc)){                
            $codentrada = $entrada->num_doc + 1;
            $codexp = Str::padLeft($codentrada, 4, '0');
        }else{
            $codexp = '0001';
        }  

        // dd($entrada->num_doc);
        return response()->json($codexp); 
    }

    public function xrecibir(Request $request)
    {
        return view('modulos.expinterno.xrecibir');
    }

    public function recibido(Request $request)
    {
        return view('modulos.expinterno.recibido');
    }

    public function emitidos(Request $request)
    {
        return view('modulos.expinterno.emitidos');
    }

    public function edit_emitidos(Request $request, $id)
    {
        $folios = Folioint::where('id', $id)->first(); 

        $archivos = Archivoint::where('folioint_id', $id)->get();

        $cant_archivos = count($archivos);

        $td_tipos = Tdtipos::where('ext', 1)->orderBy('nombre', 'desc')->get();

        // OBETENEMOS EL CODIGO DE OFICINA DEL USUARIO LOGEADO

        $c_oficina = Empleado::join('oficinas', 'oficinas.id', '=', 'empleado.oficinas_id')
                            ->select('empleado.*', 'oficinas.id as id_oficina', 'oficinas.siglas')
                            ->where('empleado.id', auth()->user()->empleado_id)
                            ->first();


        $oficinas = DB::table('oficinas as o')
                        ->select('o.id', DB::raw('CONCAT(l.nombre," - ", o.nombre) as nombre'))
                        ->join('lugares as l', 'o.lugares_id', 'l.id')
                        ->where('o.lugares_id', 1)
                        ->orderBy('l.id', 'ASC')
                        ->get();

        return view('modulos.expinterno.edit_emitidos', compact('folios', 'archivos', 'td_tipos', 'oficinas', 'cant_archivos', 'c_oficina'));
    }

    public function view_emitidos(Request $request, $id)
    {
        $oficinas = Oficina::select('oficinas.id as id_ofi', 'oficinas.nombre as nom_ofi', 'lugares.id', 'lugares.nombre as nom_lug')
                                ->join('lugares', 'lugares.id', '=', 'oficinas.lugares_id');

        $query = Folioint::join('td_tipos', 'td_tipos.id', '=', 'folioint.td_tipos_id')
                            ->join('log_derivar_int', 'log_derivar_int.folioint_id', '=', 'folioint.id')
                            ->join('empleado', 'empleado.id', '=', 'folioint.empid')                            
                            ->joinSub($oficinas, 'O', function($join){
                                $join->on( 'O.id_ofi', '=', 'folioint.c_oficina');
                            })
                            ->select('*', 'folioint.id as id_folio', DB::raw('CONCAT(empleado.nombre," ", empleado.apellido) as nombres'), 'nom_ofi', 'nom_lug', 'td_tipos.nombre as nom_tipdoc')
                            ->where('folioint.id', $id)->first();

        $archivos = Archivoint::where('folioint_id', $id)->get();

       
        //  dd($id);

        $log_archivados = Logarchivadoint::select('log_archivo_int.fecha', 'log_archivo_int.obs', 'log_archivo_int.forma','log_archivo_int.provei', 'oficinas.nombre')
                                        ->join('folioint', 'folioint.id', '=', 'log_archivo_int.folioint_id')
                                        ->join('oficinas', 'oficinas.id', '=', 'log_archivo_int.c_oficina')
                                        ->where('log_archivo_int.folioint_id', $id)->get();

        return view('modulos.expinterno.view_emitidos', compact('query', 'archivos', 'log_archivados'));
    }

    /* =====================================================  METODOS PARA LLAMAR A LOS MODALES  ====================================================== */    

    public function md_em_archivo(Request $request)
    {
        $query = Folioint::where('id', $request->id)->first();

        $archivos = Archivoint::where('folioint_id', $request->id)->where('tipo_log', $request->tipo_log)->get();

        // dd($archivos);

        $view = view('modulos.expinterno.modals.md_em_archivo', compact('query', 'archivos'))->render();

        return response()->json(['html' => $view]); 
    }

    public function md_edit_derivar(Request $request)
    {
        $query = Logderivarint::join('folioint', 'folioint.id', '=', 'log_derivar_int.folioint_id')
                                ->select('log_derivar_int.id as id_log', 'log_derivar_int.forma', 'log_derivar_int.d_oficina', 'log_derivar_int.obs as obs_log', 'folioint.firma', 'folioint.obs')
                                ->where('log_derivar_int.id', $request->id)->first();

        $oficina = Oficina::join('lugares', 'lugares.id', '=', 'oficinas.lugares_id')
                            ->select( 'oficinas.id', DB::raw('CONCAT(lugares.nombre," | ", oficinas.nombre) as destino_nom'))
                            ->get();

        $view = view('modulos.expinterno.modals.md_edit_derivar', compact('query', 'oficina'))->render();

        return response()->json(['html' => $view]); 
    }

    public function md_rec_derivar(Request $request)
    {
        $folios = Folioint::where('id', $request->id_folio)->first(); 

        $query = Logderivarint::join('folioint', 'folioint.id', '=', 'log_derivar_int.folioint_id')
                                ->select('log_derivar_int.id as id_log', 'log_derivar_int.forma', 'log_derivar_int.d_oficina', 'log_derivar_int.obs as obs_log', 'folioint.firma', 'folioint.obs')
                                ->where('log_derivar_int.id', $request->id)->first();

        $oficina = Oficina::join('lugares', 'lugares.id', '=', 'oficinas.lugares_id')
                            ->select( 'oficinas.id', DB::raw('CONCAT(lugares.nombre," | ", oficinas.nombre) as destino_nom'))
                            ->get();

        $proveido = $request->prov;

        $archivos = Archivoint::where('folioint_id', $request->id_folio)->where('tipo_log', 'derivar')->get();

        $cant_archivos = count($archivos);

        // dd($cant_archivos);

        $view = view('modulos.expinterno.modals.md_rec_derivar', compact( 'folios', 'query', 'oficina', 'proveido', 'cant_archivos'))->render();

        return response()->json(['html' => $view]);
    }
}