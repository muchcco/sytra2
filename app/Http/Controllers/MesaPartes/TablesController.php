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

class TablesController extends Controller
{
    public function tb_td_folios(Request $request)
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

        $view = view('modulos.mesapartes.tablas.tb_td_folios', compact('query'))->render();

        return response()->json(['html' => $view]);
    }

    public function tb_td_folios_view(Request $request)
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
    
        $view = view('modulos.mesapartes.tablas.tb_td_folios_view', compact('log_derivados'))->render();

        return response()->json(['html' => $view]);
    }

    
}
