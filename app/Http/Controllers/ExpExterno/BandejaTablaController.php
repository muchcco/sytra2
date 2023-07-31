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

class BandejaTablaController extends Controller
{
    public function tb_xrecibir(Request $request)
    {
        $id_empl = auth()->user()->empleado_id;

        $id_oficina = Empleado::where('id', $id_empl)->first();

        $query = DB::select("SELECT log_derivar.*, log_derivar.id AS derivar_id
                            ,(SELECT CONCAT(empleado.apellido,', ',empleado.nombre) FROM empleado WHERE empleado.id = log_derivar.empid LIMIT 1) AS enombre
                            ,(SELECT CONCAT(lugares.nombre,' | ',oficinas.nombre) FROM oficinas,lugares,folioext WHERE oficinas.id=folioext.c_oficina AND oficinas.lugares_id=lugares.id LIMIT 1)AS onombre
                            ,(SELECT folioext.firma FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS firma
                            ,(SELECT folioext.asunto FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS asunto
                            ,(SELECT folioext.obs FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS obser
                            ,(SELECT folioext.urgente FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS urgente
                            ,(SELECT folioext.nfolios FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS nfolios
                            ,(SELECT folioext.`exp` FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS `exp`
                            ,(SELECT folioext.año_exp FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS año_exp
                            ,(SELECT folioext.id FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS id_folio
                            ,(SELECT folioext.id FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS foid
                            ,(SELECT folioext.cabecera FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS cabecera
                            ,(SELECT folioext.`exp` FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS `exp`
                            ,(SELECT folioext.td_tipos_id FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS td_tipos_id
                            ,(SELECT folioext.file FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS ofile
                            ,(SELECT folioext.ext FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS oext
                            ,(SELECT folioext.size FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS osize
                            ,(SELECT folioext.atendido FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS atendido
                            FROM log_derivar
                            WHERE log_derivar.d_oficina= '".$id_oficina->oficinas_id."'
                            AND log_derivar.tipo=0
                            AND log_derivar.atendido IS NULL
                            AND log_derivar.recibido IS NULL
                            AND (SELECT folioext.id FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) IS NOT NULL
                            ORDER BY log_derivar.fecha DESC");


        $view = view('modulos.expexterno.tablas.tb_xrecibir', compact('query'))->render();

        return response()->json(['html' => $view]);
    }

    public function tb_ver_derivar(Request $request)
    {
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
        $view = view('modulos.expexterno.tablas.tb_ver_derivar', compact('log_derivados'))->render();

        return response()->json(['html' => $view]);
    }

    public function tb_recibido(Request $request)
    {        
        $id_empl = auth()->user()->empleado_id;

        $id_oficina = Empleado::where('id', $id_empl)->first();

        $query = DB::select("SELECT log_derivar.*
                            ,(SELECT CONCAT(empleado.apellido,', ',empleado.nombre) FROM empleado WHERE empleado.id = log_derivar.empid LIMIT 1) AS enombre
                            ,(SELECT CONCAT(lugares.nombre,' | ',oficinas.nombre) FROM oficinas,lugares WHERE oficinas.id=log_derivar.d_oficina AND oficinas.lugares_id=lugares.id LIMIT 1)AS onombre
                            ,(SELECT folioext.firma FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS firma
                            ,(SELECT folioext.asunto FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS asunto
                            ,(SELECT folioext.año_exp FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS año_exp
                            ,(SELECT folioext.obs FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS obser
                            ,(SELECT folioext.urgente FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS urgente
                            ,(SELECT folioext.id FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS foid
                            ,(SELECT folioext.id FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS id_folio
                            ,(SELECT folioext.cabecera FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS cabecera
                            ,(SELECT folioext.`exp` FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS `exp`
                            ,(SELECT folioext.td_tipos_id FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS td_tipos_id
                            ,(SELECT folioext.file FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS ofile
                            ,(SELECT folioext.ext FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS oext
                            ,(SELECT folioext.size FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS osize
                            FROM log_derivar
                            WHERE log_derivar.d_oficina= '".$id_oficina->oficinas_id."'
                            AND log_derivar.tipo=1
                            AND log_derivar.atendido IS NULL
                            AND log_derivar.recibido =1
                            AND (SELECT folioext.id FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) IS NOT NULL
                            ORDER BY log_derivar.fecha DESC");

        //  dd($id_oficina->oficinas_id);
        $view = view('modulos.expexterno.tablas.tb_recibido', compact('query'))->render();

        return response()->json(['html' => $view]);
    }

    public function tb_derivar(Request $request)
    {
        $archivos = Archivoext::join('folioext', 'folioext.id', '=', 'archivos_foliosext.folioext_id')
                                ->select('*', 'archivos_foliosext.id as id_archivo')
                                ->where('archivos_foliosext.folioext_id', $request->id)
                                ->where('tipo_log', 'derivar')
                                ->get();

        return $archivos;
    }

    public function tb_archivar(Request $request)
    {
        $archivos = Archivoext::join('folioext', 'folioext.id', '=', 'archivos_foliosext.folioext_id')
                                ->select('*', 'archivos_foliosext.id as id_archivo')
                                ->where('archivos_foliosext.folioext_id', $request->id)
                                ->where('tipo_log', 'archivar')
                                ->get();

        return $archivos;
    }

    public function tb_derivado(Request $request)
    {
        $id_empl = auth()->user()->empleado_id;

        $id_oficina = Empleado::where('id', $id_empl)->first();

        $query = DB::select("SELECT log_derivar.*
                            ,(SELECT CONCAT(empleado.apellido,', ',empleado.nombre) FROM empleado WHERE empleado.id = log_derivar.empid LIMIT 1) AS enombre
                            ,(SELECT CONCAT(lugares.nombre,' | ',oficinas.nombre) FROM oficinas,lugares WHERE oficinas.id=log_derivar.d_oficina AND oficinas.lugares_id=lugares.id LIMIT 1)AS onombre
                            ,(SELECT folioext.firma FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS firma
                            ,(SELECT folioext.asunto FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS asunto
                            ,(SELECT folioext.año_exp FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS año_exp
                            ,(SELECT folioext.obs FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS obser
                            ,(SELECT folioext.urgente FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS urgente
                            ,(SELECT folioext.id FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS foid
                            ,(SELECT folioext.id FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS id_folio
                            ,(SELECT folioext.cabecera FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS cabecera
                            ,(SELECT folioext.`exp` FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS `exp`
                            ,(SELECT folioext.td_tipos_id FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS td_tipos_id
                            ,(SELECT folioext.file FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS ofile
                            ,(SELECT folioext.ext FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS oext
                            ,(SELECT folioext.size FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS osize
                            ,(SELECT folioext.nfolios FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS nfolios
                            FROM log_derivar
                            WHERE log_derivar.c_oficina= '".$id_oficina->oficinas_id."'
                            AND (SELECT folioext.id FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) IS NOT NULL
                            AND log_derivar.tipo=1
                            ORDER BY log_derivar.fecha DESC");

        //  dd($id_oficina->oficinas_id);
        $view = view('modulos.expexterno.tablas.tb_derivado', compact('query'))->render();

        return response()->json(['html' => $view]);
    }

    public function tb_archivado(Request $request)
    {
        $id_empl = auth()->user()->empleado_id;

        $id_oficina = Empleado::where('id', $id_empl)->first();

        $query = DB::select("SELECT log_archivo.*
                                ,(SELECT CONCAT(empleado.apellido,', ',empleado.nombre) FROM empleado WHERE empleado.id = log_archivo.empid LIMIT 1) AS enombre
                                ,(SELECT CONCAT(lugares.nombre,' | ',oficinas.nombre) FROM oficinas,lugares,log_archivo WHERE oficinas.id=log_archivo.c_oficina AND oficinas.lugares_id=lugares.id LIMIT 1)AS onombre
                                ,(SELECT folioext.firma FROM folioext WHERE folioext.id=log_archivo.folioext_id LIMIT 1) AS firma
                                ,(SELECT folioext.asunto FROM folioext WHERE folioext.id=log_archivo.folioext_id LIMIT 1) AS asunto
                                ,(SELECT folioext.obs FROM folioext WHERE folioext.id=log_archivo.folioext_id LIMIT 1) AS obser
                                ,(SELECT folioext.año_exp FROM folioext WHERE folioext.id=log_archivo.folioext_id LIMIT 1) AS año_exp
                                ,(SELECT folioext.urgente FROM folioext WHERE folioext.id=log_archivo.folioext_id LIMIT 1) AS urgente
                                ,(SELECT folioext.id FROM folioext WHERE folioext.id=log_archivo.folioext_id LIMIT 1) AS foid
                                ,(SELECT folioext.cabecera FROM folioext WHERE folioext.id=log_archivo.folioext_id LIMIT 1) AS cabecera
                                ,(SELECT folioext.`exp` FROM folioext WHERE folioext.id=log_archivo.folioext_id LIMIT 1) AS `exp`
                                ,(SELECT folioext.id FROM folioext WHERE folioext.id=log_archivo.folioext_id LIMIT 1) AS id_folio
                                ,(SELECT folioext.td_tipos_id FROM folioext WHERE folioext.id=log_archivo.folioext_id LIMIT 1) AS td_tipos_id
                                ,(SELECT folioext.nfolios FROM folioext WHERE folioext.id=log_archivo.folioext_id LIMIT 1) AS nfolios
                                ,(SELECT folioext.file FROM folioext WHERE folioext.id=log_archivo.folioext_id LIMIT 1) AS ofile
                                ,(SELECT folioext.ext FROM folioext WHERE folioext.id=log_archivo.folioext_id LIMIT 1) AS oext
                                ,(SELECT folioext.size FROM folioext WHERE folioext.id=log_archivo.folioext_id LIMIT 1) AS osize
                                ,(SELECT folioext.nfolios FROM folioext WHERE folioext.id=log_archivo.folioext_id LIMIT 1) AS nfolios
                                FROM log_archivo
                                WHERE log_archivo.c_oficina = '".$id_oficina->oficinas_id."'
                                AND log_archivo.tipo = 1
                                AND (SELECT folioext.id FROM folioext WHERE folioext.id=log_archivo.folioext_id LIMIT 1) IS NOT NULL
                                ORDER BY log_archivo.fecha DESC");

        //  dd($id_oficina->oficinas_id);
        $view = view('modulos.expexterno.tablas.tb_archivado', compact('query'))->render();

        return response()->json(['html' => $view]);
    }
}
