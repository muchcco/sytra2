<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Logderivarext extends Model
{
    use HasFactory;

    protected $table = 'log_derivar';

    protected $fillable = [ 'id', 'tipo', 'forma', 'obs', 'fecha', 'user', 'empid', 'd_oficina', 'atendido', 'recibido', 'file', 'ext', 'size', 'prevei', 'c_oficina', 'folioext_id'];

    public $timestamps = false;
}
