<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Archivoint extends Model
{
    use HasFactory;

    protected $table = 'archivos_foliosint';

    protected $fillable = [ 'folioint_id', 'tipo_log', 'nombre_archivo', 'ubicacion', 'ext', 'size'];

    //public $timestamps = false;
}
