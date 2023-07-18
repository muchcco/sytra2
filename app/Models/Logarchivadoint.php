<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Logarchivadoint extends Model
{
    use HasFactory;

    protected $table = 'log_archivo_int';

    protected $fillable = [ 'id', 'tipo', 'forma', 'obs', 'fecha', 'user', 'empid', 'file', 'ext', 'size', 'prevei', 'c_oficina', 'folioint_id'];

    public $timestamps = false;
}
