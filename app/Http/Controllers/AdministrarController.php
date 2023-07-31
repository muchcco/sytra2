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

use App\Models\Folioint;
use App\Models\Archivoint;
use App\Models\Logderivarint;
use App\Models\Logarchivadoint;

class AdministrarController extends Controller
{
    public function interno(Request $request)
    {
        return view('modulos.administrador.interno');
    }

    public function tb_interno(Request $request)
    {        
        $id_empl = auth()->user()->empleado_id;

        $id_oficina = Empleado::where('id', $id_empl)->first();

        $query = DB::select("SELECT folioint.id as id_folio, td_tipos.nombre,folioint.exp,folioint.cabecera,folioint.fecha,folioint.firma,folioint.asunto,folioint.obs,folioint.año_exp, folioint.urgente
                            ,(SELECT CONCAT(empleado.apellido,', ',empleado.nombre) FROM empleado WHERE empleado.id = folioint.empid LIMIT 1) AS enombre
                            ,(SELECT CONCAT(lugares.nombre,' | ',oficinas.nombre) FROM oficinas,lugares WHERE oficinas.id=folioint.c_oficina AND oficinas.lugares_id=lugares.id LIMIT 1)AS onombre
                            FROM folioint 
                            INNER JOIN td_tipos 
                                    ON folioint.td_tipos_id = td_tipos.id
                            ORDER BY folioint.fecha DESC ");
        //  dd($id_oficina->oficinas_id);
        $view = view('modulos.administrador.tablas.tb_interno', compact('query'))->render();

        return response()->json(['html' => $view]);
    }

    public function ver_interno(Request $request, $id)
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

        return view('modulos.administrador.ver_interno', compact('query', 'archivos', 'log_archivados'));
    }

    public function edit_interno(Request $request, $id)
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

        return view('modulos.administrador.edit_interno', compact('folios', 'archivos', 'td_tipos', 'oficinas', 'cant_archivos', 'c_oficina'));
    }

    public function externo(Request $request)
    {
        return view('modulos.administrador.externo');
    }

    public function tb_externo(Request $request)
    {

        $query = DB::select("SELECT f.id as id_folio, t.nombre,f.exp,f.cabecera,f.fecha,f.firma,f.asunto,f.obs,f.año_exp,
                                    (SELECT CONCAT(lug.`nombre`, ' | ' , o.`nombre`) FROM oficinas AS o , lugares AS lug WHERE o.`id` = f.c_oficina ) AS nom_oficina_inicio ,
                                    (SELECT em.`nombre` FROM empleado AS em WHERE em.id = f.empid) AS nom_empleado,
                                    f.urgente 
                                FROM
                                    folioext AS f 
                                    INNER JOIN td_tipos AS t 
                                    ON f.td_tipos_id = t.id
                                ORDER BY f.fecha DESC ");

        $view = view('modulos.administrador.tablas.tb_externo', compact('query'))->render();

        return response()->json(['html' => $view]);
    }

    public function ver_externo(Request $request, $id)
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
                            ->where('folioext.id', $request->id)->first();

        $archivos = Archivoext::where('folioext_id', $request->id)->get();

       
                                        // dd($log_derivados);

        $log_archivados = Logarchivados::select('log_archivo.fecha', 'log_archivo.obs', 'log_archivo.forma','log_archivo.provei', 'oficinas.nombre')
                                        ->join('folioext', 'folioext.id', '=', 'log_archivo.folioext_id')
                                        ->join('oficinas', 'oficinas.id', '=', 'log_archivo.c_oficina')
                                        ->where('log_archivo.folioext_id', $request->id)->get();

        return view('modulos.administrador.ver_externo', compact('query', 'archivos', 'log_archivados'));
    }

    public function edit_externo(Request $request, $id)
    {

        $folios = Folioext::where('id', $id)->first(); 
        $archivos = Archivoext::where('folioext_id', $id)->get();

        $cant_archivos = count($archivos);

        // dd($cant_archivos);

        $td_tipos = Tdtipos::where('ext', 1)->orderBy('nombre', 'desc')->get();

        $oficinas = DB::table('oficinas as o')
                        ->select('o.id', DB::raw('CONCAT(l.nombre," - ", o.nombre) as nombre'))
                        ->join('lugares as l', 'o.lugares_id', 'l.id')
                        ->where('o.lugares_id', 1)
                        ->orderBy('l.id', 'ASC')
                        ->get();


        return view('modulos.administrador.edit_externo', compact('folios', 'archivos', 'td_tipos', 'oficinas', 'cant_archivos'));
    }

}
