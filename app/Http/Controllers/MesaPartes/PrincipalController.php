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


class PrincipalController extends Controller
{
    public function td_nuevo(Request $request)
    {   

        $td_tipos = Tdtipos::where('ext', 1)->orderBy('nombre', 'desc')->get();

        $oficinas = DB::table('oficinas as o')
                        ->select('o.id', DB::raw('CONCAT(l.nombre," - ", o.nombre) as nombre'))
                        ->join('lugares as l', 'o.lugares_id', 'l.id')
                        ->where('o.lugares_id', 1)
                        ->orderBy('l.id', 'ASC')
                        ->get();

        return view('modulos.mesapartes.td_nuevo', compact('td_tipos', 'oficinas'));
    }    

    public function td_folios(Request $request)
    {
        return view('modulos.mesapartes.td_folios');
    }
    public function td_folios_view(Request $request, $id)
    {
        $query = Folioext::join('td_tipos', 'td_tipos.id', '=', 'folioext.td_tipos_id')
                            ->join('log_derivar', 'log_derivar.folioext_id', '=', 'folioext.id')
                            ->select('*', 'folioext.id as id_folio')
                            ->where('folioext.id', $request->id)->first();

        $archivos = Archivoext::where('folioext_id', $request->id)->get();

       
                                        // dd($log_derivados);

        $log_archivados = Logarchivados::select('log_archivo.fecha', 'log_archivo.obs', 'log_archivo.forma','log_archivo.provei', 'oficinas.nombre')
                                        ->join('folioext', 'folioext.id', '=', 'log_archivo.folioext_id')
                                        ->join('oficinas', 'oficinas.id', '=', 'log_archivo.c_oficina')
                                        ->where('log_archivo.folioext_id', $request->id)->get();

        return view('modulos.mesapartes.td_folios_view', compact('query', 'archivos', 'log_archivados'));
    }

    public function td_folios_edit(Request $request, $id)
    {

        $folios = Folioext::where('id', $id)->first(); 
        $archivos = Archivoext::where('folioext_id', $id)->first();

        $td_tipos = Tdtipos::where('ext', 1)->orderBy('nombre', 'desc')->get();

        $oficinas = DB::table('oficinas as o')
                        ->select('o.id', DB::raw('CONCAT(l.nombre," - ", o.nombre) as nombre'))
                        ->join('lugares as l', 'o.lugares_id', 'l.id')
                        ->where('o.lugares_id', 1)
                        ->orderBy('l.id', 'ASC')
                        ->get();


        return view('modulos.mesapartes.td_folios_edit', compact('folios', 'archivos', 'td_tipos', 'oficinas'));
    }


    /* =====================================================  METODOS PARA LLAMAR A LOS MODALES  ====================================================== */    

    public function md_archivos_td_folios(Request $request)
    {
        $query = Folioext::where('id', $request->id)->first();

        $archivos = Archivoext::where('folioext_id', $request->id)->get();

        $view = view('modulos.mesapartes.modals.md_archivos_td_folios', compact('query', 'archivos'))->render();

        return response()->json(['html' => $view]); 
    }

    public function md_ver_td_folios(Request $request)
    {
        $query = Folioext::join('td_tipos', 'td_tipos.id', '=', 'folioext.td_tipos_id')
                            ->where('folioext.id', $request->id)->first();

        $archivos = Archivoext::where('folioext_id', $request->id)->get();

        $oficinas = Oficina::select('oficinas.id as id_ofi', 'oficinas.nombre as nom_ofi', 'lugares.id', 'lugares.nombre as nom_lug')
                                ->join('lugares', 'lugares.id', '=', 'oficinas.lugares_id');

        $log_derivados = Logderivarext::select('log_derivar.fecha', 'log_derivar.obs', 'log_derivar.forma','log_derivar.provei', 'nom_ofi', 'nom_lug', DB::raw('CONCAT(empleado.nombre," ", empleado.apellido) as nombres'), 'log_derivar.file', 'log_derivar.id')
                                        ->join('folioext', 'folioext.id', '=', 'log_derivar.folioext_id')
                                        ->joinSub($oficinas, 'O', function($join){
                                            $join->on( 'O.id_ofi', '=', 'log_derivar.d_oficina');
                                        })
                                        ->leftJoin('empleado', 'empleado.id', '=', 'log_derivar.empid')
                                        ->where('log_derivar.folioext_id', $request->id)->get();
                                        // dd($log_derivados);

        $log_archivados = Logarchivados::select('log_archivo.fecha', 'log_archivo.obs', 'log_archivo.forma','log_archivo.provei', 'oficinas.nombre')
                                        ->join('folioext', 'folioext.id', '=', 'log_archivo.folioext_id')
                                        ->join('oficinas', 'oficinas.id', '=', 'log_archivo.c_oficina')
                                        ->where('log_archivo.folioext_id', $request->id)->get();

        $view = view('modulos.mesapartes.modals.md_ver_td_folios', compact('query', 'archivos', 'log_derivados', 'log_archivados'))->render();

        return response()->json(['html' => $view]); 
    }
}