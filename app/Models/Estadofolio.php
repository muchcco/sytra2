<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estadofolio extends Model
{
    use HasFactory;

    protected $table = 'estados_folio';

    protected $fillable = [ 
        'id',
        'descripcion',
        'siglas',
        'color',
        'email',
        'tipo_documental'
    ];

    public $timestamps = false;
}
