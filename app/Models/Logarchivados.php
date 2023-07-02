<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Logarchivados extends Model
{
    use HasFactory;

    protected $table = 'log_archivo';

    protected $fillable = [ 'id', 'tipo', 'forma', 'obs', 'fecha', 'user', 'empid', 'file', 'ext', 'size', 'prevei', 'c_oficina', 'folioext_id'];

    public $timestamps = false;
}
