<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empleado extends Model
{
    use HasFactory;

    protected $table = 'empleado';

    protected $fillable = [ 
        'id',
        'nombre',
        'apellido',
        'foto',
        'email',
        'fechnac',
        'oficina_id',
        'encargado',
        'sexo',
        'tit_tipo',
        'tit_otro',
        'cargo',
    ];

    public $timestamps = false;
}
