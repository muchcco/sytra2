<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Oficina extends Model
{
    use HasFactory;

    protected $table = 'oficinas';

    protected $fillable = [ 
        'id',
        'nombre',
        'obs',
        'lugares_id',
        'siglas',
    ];

    public $timestamps = false;
}
