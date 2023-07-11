<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Logderivarint extends Model
{
    use HasFactory;

    protected $table = 'log_derivar_int';

    protected $fillable = [ 
                            'id', 
                            'tipo', 
                            'forma', 
                            'obs', 
                            'fecha', 
                            'user', 
                            'empid', 
                            'd_oficina', 
                            'atendido', 
                            'recibido', 
                            'file', 
                            'ext', 
                            'size', 
                            'prevei', 
                            'c_oficina', 
                            'folioint_id'
                        ];

    public $timestamps = false;
}
