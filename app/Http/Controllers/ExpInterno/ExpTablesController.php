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
use App\Models\Logarchivadoint;

class ExpTablesController extends Controller
{
    public function tb_xrecibir(Request $request)
    {        
        $id_empl = auth()->user()->empleado_id;

        $id_oficina = Empleado::where('id', $id_empl)->first();

        $query = DB::select("SELECT folioint.id as id_folio, td_tipos.nombre,folioint.exp,folioint.cabecera,folioint.fecha,folioint.firma,folioint.asunto,folioint.obs,folioint.año_exp, folioint.urgente, log_derivar_int.id as derivar_id
                            ,(SELECT CONCAT(empleado.apellido,', ',empleado.nombre) FROM empleado WHERE empleado.id = folioint.empid LIMIT 1) AS enombre
                            ,(SELECT CONCAT(lugares.nombre,' | ',oficinas.nombre) FROM oficinas,lugares WHERE oficinas.id=folioint.c_oficina AND oficinas.lugares_id=lugares.id LIMIT 1)AS onombre
                            FROM folioint 
                            INNER JOIN td_tipos 
                                    ON folioint.td_tipos_id = td_tipos.id
                            INNER JOIN log_derivar_int
                                    ON log_derivar_int.`folioint_id` = folioint.`id`
                            WHERE log_derivar_int.d_oficina = '".$id_oficina->oficinas_id."'
                            AND log_derivar_int.`recibido` IS NULL
                            ORDER BY folioint.fecha DESC ");
        //  dd($id_oficina->oficinas_id);
        $view = view('modulos.expinterno.tablas.tb_xrecibir', compact('query'))->render();

        return response()->json(['html' => $view]);
    }

    public function tb_recibido(Request $request)
    {        
        $id_empl = auth()->user()->empleado_id;

        $id_oficina = Empleado::where('id', $id_empl)->first();

        $query = DB::select("SELECT log_derivar_int.*
                            ,(SELECT CONCAT(empleado.apellido,', ',empleado.nombre) FROM empleado WHERE empleado.id = log_derivar_int.empid LIMIT 1) AS enombre
                            ,(SELECT CONCAT(lugares.nombre,' | ',oficinas.nombre) FROM oficinas,lugares WHERE oficinas.id=log_derivar_int.d_oficina AND oficinas.lugares_id=lugares.id LIMIT 1)AS onombre
                            ,(SELECT folioint.firma FROM folioint WHERE folioint.id=log_derivar_int.folioint_id LIMIT 1) AS firma
                            ,(SELECT folioint.asunto FROM folioint WHERE folioint.id=log_derivar_int.folioint_id LIMIT 1) AS asunto
                            ,(SELECT folioint.año_exp FROM folioint WHERE folioint.id=log_derivar_int.folioint_id LIMIT 1) AS año_exp
                            ,(SELECT folioint.obs FROM folioint WHERE folioint.id=log_derivar_int.folioint_id LIMIT 1) AS obser
                            ,(SELECT folioint.urgente FROM folioint WHERE folioint.id=log_derivar_int.folioint_id LIMIT 1) AS urgente
                            ,(SELECT folioint.id FROM folioint WHERE folioint.id=log_derivar_int.folioint_id LIMIT 1) AS foid
                            ,(SELECT folioint.id FROM folioint WHERE folioint.id=log_derivar_int.folioint_id LIMIT 1) AS id_folio
                            ,(SELECT folioint.cabecera FROM folioint WHERE folioint.id=log_derivar_int.folioint_id LIMIT 1) AS cabecera
                            ,(SELECT folioint.`exp` FROM folioint WHERE folioint.id=log_derivar_int.folioint_id LIMIT 1) AS `exp`
                            ,(SELECT folioint.td_tipos_id FROM folioint WHERE folioint.id=log_derivar_int.folioint_id LIMIT 1) AS td_tipos_id
                            ,(SELECT folioint.file FROM folioint WHERE folioint.id=log_derivar_int.folioint_id LIMIT 1) AS ofile
                            ,(SELECT folioint.ext FROM folioint WHERE folioint.id=log_derivar_int.folioint_id LIMIT 1) AS oext
                            ,(SELECT folioint.size FROM folioint WHERE folioint.id=log_derivar_int.folioint_id LIMIT 1) AS osize
                            FROM log_derivar_int
                            WHERE log_derivar_int.d_oficina= '".$id_oficina->oficinas_id."'
                            AND log_derivar_int.tipo=1
                            AND log_derivar_int.atendido IS NULL
                            AND log_derivar_int.recibido =1
                            AND (SELECT folioint.id FROM folioint WHERE folioint.id=log_derivar_int.folioint_id LIMIT 1) IS NOT NULL
                            ORDER BY log_derivar_int.fecha DESC");

        //  dd($id_oficina->oficinas_id);
        $view = view('modulos.expinterno.tablas.tb_recibido', compact('query'))->render();

        return response()->json(['html' => $view]);
    }

    public function tb_emitidos(Request $request)
    {        
        $id_empl = auth()->user()->empleado_id;

        $id_oficina = Empleado::where('id', $id_empl)->first();

        $query = DB::select("SELECT folioint.id as id_folio, td_tipos.nombre,folioint.exp,folioint.cabecera,folioint.fecha,folioint.firma,folioint.asunto,folioint.obs,folioint.año_exp, folioint.urgente
                            ,(SELECT CONCAT(empleado.apellido,', ',empleado.nombre) FROM empleado WHERE empleado.id = folioint.empid LIMIT 1) AS enombre
                            ,(SELECT CONCAT(lugares.nombre,' | ',oficinas.nombre) FROM oficinas,lugares WHERE oficinas.id=folioint.c_oficina AND oficinas.lugares_id=lugares.id LIMIT 1)AS onombre
                            FROM folioint 
                            INNER JOIN td_tipos 
                                    ON folioint.td_tipos_id = td_tipos.id
                            WHERE folioint.c_oficina = '".$id_oficina->oficinas_id."'
                            ORDER BY folioint.fecha DESC ");
        //  dd($id_oficina->oficinas_id);
        $view = view('modulos.expinterno.tablas.tb_emitidos', compact('query'))->render();

        return response()->json(['html' => $view]);
    }

    public function tabladocexpediente(Request $request)
    {
        $archivos = Archivoext::join('folioint', 'folioint.id', '=', 'archivos_foliosext.folioint_id')
                                ->select('*', 'archivos_foliosint.id as id_archivo')
                                ->where('archivos_foliosext.folioint_id', $request->id)->get();

        return $archivos;
    }

    public function tb_emitidos_view(Request $request)
    {
        $oficinas = Oficina::select('oficinas.id as id_ofi', 'oficinas.nombre as nom_ofi', 'lugares.id', 'lugares.nombre as nom_lug')
                                ->join('lugares', 'lugares.id', '=', 'oficinas.lugares_id');

        $log_derivados = Logderivarint::select('log_derivar.fecha', 'log_derivar.obs', 'log_derivar.forma','log_derivar.provei', 'nom_ofi', 'nom_lug', DB::raw('CONCAT(empleado.nombre," ", empleado.apellido) as nombres'), 'log_derivar.file', 'log_derivar.id')
                                        ->join('folioint', 'folioint.id', '=', 'log_derivar.folioint_id')
                                        ->joinSub($oficinas, 'O', function($join){
                                            $join->on( 'O.id_ofi', '=', 'log_derivar.d_oficina');
                                        })
                                        ->leftJoin('empleado', 'empleado.id', '=', 'log_derivar.empid')
                                        ->where('log_derivar.folioint_id', $request->id)->get();
    
        $view = view('modulos.expinterno.tablas.tb_emitidos_view', compact('log_derivados'))->render();

        return response()->json(['html' => $view]);
    }

    public function tb_emitidos_derivar_view(Request $request)
    {
        $oficinas = Oficina::select('oficinas.id as id_ofi', 'oficinas.nombre as nom_ofi', 'lugares.id', 'lugares.nombre as nom_lug')
                                ->join('lugares', 'lugares.id', '=', 'oficinas.lugares_id');

        $log_derivados = Logderivarint::select('log_derivar_int.fecha', 'log_derivar_int.obs', 'log_derivar_int.forma','log_derivar_int.provei', 'nom_ofi', 'nom_lug', DB::raw('CONCAT(empleado.nombre," ", empleado.apellido) as nombres'), 'log_derivar_int.file', 'log_derivar_int.id')
                                        ->join('folioint', 'folioint.id', '=', 'log_derivar_int.folioint_id')
                                        ->joinSub($oficinas, 'O', function($join){
                                            $join->on( 'O.id_ofi', '=', 'log_derivar_int.d_oficina');
                                        })
                                        ->leftJoin('empleado', 'empleado.id', '=', 'log_derivar_int.empid')
                                        ->where('log_derivar_int.folioint_id', $request->id)->get();
                                        
        // dd($log_derivados);
        $view = view('modulos.expinterno.tablas.tb_emitidos_derivar_view', compact('log_derivados'))->render();

        return response()->json(['html' => $view]);
    }

    public function tb_emitidos_archivar_view(Request $request)
    {
        $oficinas = Oficina::select('oficinas.id as id_ofi', 'oficinas.nombre as nom_ofi', 'lugares.id', 'lugares.nombre as nom_lug')
                                ->join('lugares', 'lugares.id', '=', 'oficinas.lugares_id');

        $log_archivado = Logarchivadoint::select('log_archivo_int.fecha', 'log_archivo_int.obs', 'log_archivo_int.forma','log_archivo_int.provei', 'nom_ofi', 'nom_lug', DB::raw('CONCAT(empleado.nombre," ", empleado.apellido) as nombres'), 'log_archivo_int.file', 'log_archivo_int.id')
                                        ->join('folioint', 'folioint.id', '=', 'log_archivo_int.folioint_id')
                                        ->joinSub($oficinas, 'O', function($join){
                                            $join->on( 'O.id_ofi', '=', 'log_archivo_int.d_oficina');
                                        })
                                        ->leftJoin('empleado', 'empleado.id', '=', 'log_archivo_int.empid')
                                        ->where('log_archivo_int.folioint_id', $request->id)->get();
    
        $view = view('modulos.expinterno.tablas.tb_emitidos_archivar_view', compact('log_archivado'))->render();

        return response()->json(['html' => $view]);
    }

    public function tb_edit_file(Request $request)
    {
        $archivos = Archivoint::join('folioint', 'folioint.id', '=', 'archivos_foliosint.folioint_id')
                                ->select('*', 'archivos_foliosint.id as id_archivo')
                                ->where('archivos_foliosint.folioint_id', $request->id)
                                ->where('tipo_log', 'folioint')
                                ->get();

        return $archivos;
    }

    public function tb_derivar(Request $request)
    {
        $archivos = Archivoint::join('folioint', 'folioint.id', '=', 'archivos_foliosint.folioint_id')
                                ->select('*', 'archivos_foliosint.id as id_archivo')
                                ->where('archivos_foliosint.folioint_id', $request->id)
                                ->where('tipo_log', 'derivar')
                                ->get();

        return $archivos;
    }

}
