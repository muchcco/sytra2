<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ExternoController extends Controller
{
    public function mesa_partes(Request $request)
    {
        return view('mesa_partes');
    }
}
