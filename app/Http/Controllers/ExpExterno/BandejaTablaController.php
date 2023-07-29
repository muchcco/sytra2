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

        $query = DB::select("SELECT log_derivar.*
                            ,(SELECT CONCAT(empleado.apellido,', ',empleado.nombre) FROM empleado WHERE empleado.id = log_derivar.empid LIMIT 1) AS enombre
                            ,(SELECT CONCAT(lugares.nombre,' | ',oficinas.nombre) FROM oficinas,lugares,folioext WHERE oficinas.id=folioext.c_oficina AND oficinas.lugares_id=lugares.id LIMIT 1)AS onombre
                            ,(SELECT folioext.firma FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS firma
                            ,(SELECT folioext.asunto FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS asunto
                            ,(SELECT folioext.obs FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS obser
                            ,(SELECT folioext.urgente FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS urgente
                            ,(SELECT folioext.nfolios FROM folioext WHERE folioext.id=log_derivar.folioext_id LIMIT 1) AS nfolios
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
}
