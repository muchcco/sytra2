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

use App\Models\User;
use App\Models\Lugar;
use App\Models\Oficina;
use App\Models\Tdtipos;
use App\Models\Empleado;
use App\Models\Folioext;
use App\Models\Archivoext;
use App\Models\Logderivarext;
use App\Models\Logarchivados;

class BandejaController extends Controller
{
    public function xrecibir(Request $request)
    {
        return view('modulos.expexterno.xrecibir');
    }

    public function ver_folio(Request $request,  $id)
    {
        $oficinas = Oficina::select('oficinas.id as id_ofi', 'oficinas.nombre as nom_ofi', 'lugares.id', 'lugares.nombre as nom_lug')
                                ->join('lugares', 'lugares.id', '=', 'oficinas.lugares_id');

        $query = Folioext::join('td_tipos', 'td_tipos.id', '=', 'folioext.td_tipos_id')
                            ->join('log_derivar', 'log_derivar.folioext_id', '=', 'folioext.id')
                            ->join('empleado', 'empleado.id', '=', 'folioext.empid')                            
                            ->joinSub($oficinas, 'O', function($join){
                                $join->on( 'O.id_ofi', '=', 'folioext.c_oficina');
                            })
                            ->select('*', 'folioext.id as id_folio', DB::raw('CONCAT(empleado.nombre," ", empleado.apellido) as nombres'), 'nom_ofi', 'nom_lug', 'td_tipos.nombre as nom_tipdoc')
                            ->where('folioext.id', $id)->first();

        $archivos = Archivoext::where('folioext_id', $id)->get();

       
        //  dd($id);

        $log_archivados = Logarchivados::select('log_archivo.fecha', 'log_archivo.obs', 'log_archivo.forma','log_archivo.provei', 'oficinas.nombre')
                                        ->join('folioext', 'folioext.id', '=', 'log_archivo.folioext_id')
                                        ->join('oficinas', 'oficinas.id', '=', 'log_archivo.c_oficina')
                                        ->where('log_archivo.folioext_id', $id)->get();

        return view('modulos.expexterno.ver_folio', compact('query', 'archivos', 'log_archivados'));
    }

    public function recibido(Request $request)
    {
        return view('modulos.expexterno.recibido');
    }

    public function derivado(Request $request)
    {
        return view('modulos.expexterno.derivado');
    }

    public function archivado(Request $request)
    {
        return view('modulos.expexterno.archivado');
    }


    /**********************************  MODALES **************************************************************/

    public function md_archivo(Request $request)
    {
        $query = Folioext::where('id', $request->id)->first();

        $archivos = Archivoext::where('folioext_id', $request->id)->where('tipo_log', $request->tipo_log)->get();

        // dd($request->id);

        $view = view('modulos.expexterno.modals.md_archivo', compact('query', 'archivos'))->render();

        return response()->json(['html' => $view]); 
    }

    public function md_edit_derivar(Request $request)
    {
        $query = Logderivarext::join('folioext', 'folioext.id', '=', 'log_derivar.folioext_id')
                                ->select('log_derivar.id as id_log', 'log_derivar.forma', 'log_derivar.d_oficina', 'log_derivar.obs as obs_log', 'folioext.firma', 'folioext.obs')
                                ->where('log_derivar.id', $request->id)->first();

        $oficina = Oficina::join('lugares', 'lugares.id', '=', 'oficinas.lugares_id')
                            ->select( 'oficinas.id', DB::raw('CONCAT(lugares.nombre," | ", oficinas.nombre) as destino_nom'))
                            ->get();

        $view = view('modulos.expinterno.modals.md_edit_derivar', compact('query', 'oficina'))->render();

        return response()->json(['html' => $view]);
    }

    public function md_rec_derivar(Request $request)
    {
        $folios = Folioext::where('id', $request->id_folio)->first(); 

        $query = Logderivarext::join('folioext', 'folioext.id', '=', 'log_derivar.folioext_id')
                                ->select('log_derivar.id as id_log', 'log_derivar.forma', 'log_derivar.d_oficina', 'log_derivar.obs as obs_log', 'folioext.firma', 'folioext.obs', 'folioext.id')
                                ->where('log_derivar.id', $request->id)->first();

        $oficina = Oficina::join('lugares', 'lugares.id', '=', 'oficinas.lugares_id')
                            ->select( 'oficinas.id', DB::raw('CONCAT(lugares.nombre," | ", oficinas.nombre) as destino_nom'))
                            ->get();

        $proveido = $request->prov;

        $archivos = Archivoext::where('folioext_id', $request->id_folio)->where('tipo_log', 'derivar')->get();

        $cant_archivos = count($archivos);

        // dd($cant_archivos);

        $view = view('modulos.expexterno.modals.md_rec_derivar', compact( 'folios', 'query', 'oficina', 'proveido', 'cant_archivos'))->render();

        return response()->json(['html' => $view]);
    }

    public function md_rec_archivar(Request $request)
    {
        $folios = Folioext::where('id', $request->id_folio)->first(); 
        // dd($request->id_folio);

        $proveido = $request->prov;

        $archivos = Archivoext::where('folioext_id', $request->id_folio)->where('tipo_log', 'derivar')->get();

        $query = Logderivarext::join('folioext', 'folioext.id', '=', 'log_derivar.folioext_id')
                                ->select('log_derivar.id as id_log', 'log_derivar.forma', 'log_derivar.d_oficina', 'log_derivar.obs as obs_log', 'folioext.firma', 'folioext.obs', 'folioext.id')
                                ->where('log_derivar.id', $request->id)->first();

        $cant_archivos = count($archivos);

        $view = view('modulos.expexterno.modals.md_rec_archivar', compact( 'folios', 'query' ,'proveido', 'cant_archivos'))->render();

        return response()->json(['html' => $view]);
    }
}
