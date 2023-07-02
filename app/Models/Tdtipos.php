<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tdtipos extends Model
{
    use HasFactory;

    protected $table = 'td_tipos';

    protected $fillable = [ 'id','nombres', 'abrev','int', 'ext'];

    public $timestamps = false;
}
