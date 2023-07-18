<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Folioint extends Model
{
    use HasFactory;

    protected $table = 'folioint';

    protected $fillable = [ 
                            'id',
                            'exp', 
                            'año_exo',
                            'mes_exo', 
                            'asunto',
                            'firma', 
                            'num_doc',
                            'nfolio', 
                            'fecha', 
                            'user', 
                            'empid', 
                            'c_oficina', 
                            'obs', 
                            'file', 
                            'ext', 
                            'size', 
                            'cabecera', 
                            'env', 
                            'aid', 
                            'prove', 
                            'prove_id', 
                            'td_tipos_id', 
                            'descrip', 
                            'redac', 
                            'listo', 
                            'urgente' 
                        ];

    public $timestamps = false;

}
