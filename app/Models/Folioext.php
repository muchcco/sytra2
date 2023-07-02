<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Folioext extends Model
{
    use HasFactory;

    protected $table = 'folioext';

    protected $fillable = [ 'id','exp', 'año_exo','mes_exo', 'asunto','firma', 'nfolio', 'fecha', 'user', 'empid', 'c_oficina', 'obs', 'file', 'ext', 'size', 'cabecera', 'env', 'aid', 'atendido', 'td_tipos_id', 'pago', 'urgente', 'telefono', 'correo', 'direccion' ];

    public $timestamps = false;

}
