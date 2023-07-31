<?php

namespace App\Http\Controllers\Admin;

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
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Support\Facades\Crypt;

use App\Models\User;
use App\Models\Lugar;
use App\Models\Oficina;
use App\Models\Tdtipos;
use App\Models\Empleado;

class EmpleadoControl extends Controller
{
    public function empleados(Request $request)
    {
        return  view('admin.empleados');
    }

    public function tb_empleados(Request $request)
    {
        $query = DB::select("SELECT empleado.*, oficinas.nombre AS onombre, (SELECT COUNT(users.id) FROM users WHERE users.empleado_id=empleado.id) AS tot 
                            FROM empleado, oficinas 
                            WHERE empleado.oficinas_id=oficinas.id 
                            ORDER BY empleado.apellido ASC");
        // dd($query);
        $view = view('admin.tablas.tb_empleados', compact('query'))->render();

        return response()->json(['html' => $view]);
    }

    public function add_empleado(Request $request)
    {
        $oficina = Oficina::get();

        $view = view('admin.modals.add_empleado', compact('oficina'))->render();

        return response()->json(['html' => $view]);
    }

    public function store_add_empleado(Request $request)
    {
        $empleado = new Empleado;       
        $empleado->nombre = $request->nombre;
        $empleado->apellido = $request->apellido;
        $empleado->dni = $request->dni;
        $empleado->mail = $request->mail;
        $empleado->oficinas_id = $request->oficinas_id;
        $empleado->encargado = $request->encargado;
        $empleado->sexo = $request->sexo;
        $empleado->fechnac = $request->f_nacimiento;
        $empleado->tit_tipo = $request->tit_tipo;
        $empleado->cargo = $request->cargo;
        $empleado->save();

        return $empleado;
    }

    public function edit_empleado(Request $request)
    {
        $oficina = Oficina::get();

        $empleado = Empleado::where('id', $request->id)->first();

        $view = view('admin.modals.edit_empleado', compact('oficina', 'empleado'))->render();

        return response()->json(['html' => $view]);
    }

    public function update_empleado(Request $request)
    {
        $empleado = Empleado::findOrFail($request->id);     
        $empleado->nombre = $request->nombre;
        $empleado->apellido = $request->apellido;
        $empleado->dni = $request->dni;
        $empleado->mail = $request->mail;
        $empleado->oficinas_id = $request->oficinas_id;
        $empleado->encargado = $request->encargado;
        $empleado->sexo = $request->sexo;
        $empleado->fechnac = $request->f_nacimiento;
        $empleado->tit_tipo = $request->tit_tipo;
        $empleado->cargo = $request->cargo;
        $empleado->save();

        return $empleado;
    }

    public function ver_empleados(Request $request, $id)
    {
        $empleado = Empleado::join('oficinas', 'oficinas.id', '=', 'empleado.oficinas_id')
                                ->select(DB::raw("CONCAT(empleado.apellido,', ',empleado.nombre) as nombreu"), 'empleado.sexo', 'oficinas.nombre as nom_ofi', 'empleado.encargado', 'empleado.cargo', 'empleado.id')
                                ->where('empleado.id', $id)->first();
        // dd($empleado);

        $usuario = User::where('empleado_id', $id)->first();

        $count = User::where('empleado_id', $id)->count();

        // dd($count);

        return  view('admin.ver_empleados', compact('empleado', 'usuario', 'count'));
    }

    public function cuenta_us(Request $request)
    {
        $id_empleado = $request->id;

        $empleado = Empleado::where('id', $id_empleado)->first();

        $view = view('admin.modals.cuenta_us', compact('empleado'))->render();

        return response()->json(['html' => $view]);
    }

    public function add_cuenta_us(Request $request)
    {
        //obtenemos datos del empleado

        $empleado = Empleado::where('id', $request->id_empleado)->first();

        if($empleado->mail === NULL){
            $email = 'NULL';
        }else{
            $email = $empleado->mail;
        }

        $user = new User;
        $user->name = $empleado->apellido.', '.$empleado->nombre;
        $user->usuario = $empleado->dni;
        $user->empleado_id = $empleado->id;
        $user->level = $request->level;
        $user->email = $empleado->dni;
        $user->password = Hash::make($request->password);
        $user->save();

        return $user;
    }

    public function cuenta_us_edit(Request $request)
    {
        $id_empleado = $request->id;

        $empleado = Empleado::where('id', $id_empleado)->first();

        $usuario = User::where('empleado_id', $id_empleado)->first();

        // $password = decrypt($usuario['password']);

        // dd($password);

        $view = view('admin.modals.cuenta_us_edit', compact('empleado', 'usuario'))->render();

        return response()->json(['html' => $view]);
    }

    public function edit_cuenta_us(Request $request)
    {
        $update = User::findOrFail($request->id);
        $update->level = $request->level;
        if(!empty($request['password']))
        {
            $update['password'] = Hash::make($request['password']);
        }
        $update->save();

        return $update;
    }
}
