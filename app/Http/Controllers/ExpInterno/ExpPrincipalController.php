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
use App\Models\Logderivarext;
use App\Models\Logarchivadoint;

class ExpPrincipalController extends Controller
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

        return view('modulos.expinterno.td_nuevo', compact('td_tipos', 'oficinas'));
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

        $oficinas = DB::table('oficinas as o')
                        ->select('o.id', DB::raw('CONCAT(l.nombre," - ", o.nombre) as nombre'))
                        ->join('lugares as l', 'o.lugares_id', 'l.id')
                        ->where('o.lugares_id', 1)
                        ->orderBy('l.id', 'ASC')
                        ->get();

        return view('modulos.expinterno.edit_emitidos', compact('folios', 'archivos', 'td_tipos', 'oficinas', 'cant_archivos'));
    }

    public function view_emitidos(Request $request, $id)
    {
        $oficinas = Oficina::select('oficinas.id as id_ofi', 'oficinas.nombre as nom_ofi', 'lugares.id', 'lugares.nombre as nom_lug')
                                ->join('lugares', 'lugares.id', '=', 'oficinas.lugares_id');

        $query = Folioint::join('td_tipos', 'td_tipos.id', '=', 'folioint.td_tipos_id')
                            ->join('log_derivar', 'log_derivar.folioint_id', '=', 'folioint.id')
                            ->join('empleado', 'empleado.id', '=', 'folioint.empid')
                            ->joinSub($oficinas, 'O', function($join){
                                $join->on( 'O.id_ofi', '=', 'folioint.c_oficina');
                            })
                            ->select('*', 'folioint.id as id_folio', DB::raw('CONCAT(empleado.nombre," ", empleado.apellido) as nombres'), 'nom_ofi', 'nom_lug')
                            ->where('folioint.id', $request->id)->first();

        $archivos = Archivoint::where('folioint_id', $request->id)->get();

       
                                        // dd($log_derivados);

        $log_archivados = Logarchivados::select('log_archivo.fecha', 'log_archivo.obs', 'log_archivo.forma','log_archivo.provei', 'oficinas.nombre')
                                        ->join('folioint', 'folioint.id', '=', 'log_archivo.folioint_id')
                                        ->join('oficinas', 'oficinas.id', '=', 'log_archivo.c_oficina')
                                        ->where('log_archivo.folioint_id', $request->id)->get();

        return view('modulos.mesapartes.view_emitidos', compact('query', 'archivos', 'log_archivados'));
    }

    /* =====================================================  METODOS PARA LLAMAR A LOS MODALES  ====================================================== */    

    public function md_em_archivo(Request $request)
    {
        $query = Folioint::where('id', $request->id)->first();

        $archivos = Archivoint::where('folioint_id', $request->id)->get();

        $view = view('modulos.expinterno.modals.md_em_archivo', compact('query', 'archivos'))->render();

        return response()->json(['html' => $view]); 
    }
}
