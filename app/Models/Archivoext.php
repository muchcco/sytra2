<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Archivoext extends Model
{
    use HasFactory;

    protected $table = 'archivos_foliosext';

    protected $fillable = [ 'folioext_id', 'tipo_log', 'nombre_archivo', 'ubicacion', 'ext', 'size'];

    //public $timestamps = false;
}
