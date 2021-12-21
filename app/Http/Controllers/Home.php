<?php

namespace App\Http\Controllers;

use App\Models\Attributes;
use Illuminate\Http\Request;

class Home extends Controller
{
    public function show()
    {
        return view('storefront.homepage.index',['name' => 'Polina']);
    }
}
