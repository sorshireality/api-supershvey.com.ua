<?php

namespace App\Http\Controllers;

use App\Http\Components\ModelHelperController;
use App\Models\AttributeComposition;
use App\Models\Attributes;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Mockery\Exception;

class AttributeCompositionsController extends Controller
{
    public function index(): Response
    {
        return new Response(
            AttributeComposition::all(),
            200
        );
    }

    public function store(Request $request)
    {
        $status = ModelHelperController::addEntityBasedOnClass(AttributeComposition::class, $request);
        if (!$status) {
            throw new Exception('Ошибка добавления состава для продукта', 500);
        }

        return new Response(
            json_encode($status),
            200
        );
    }
}