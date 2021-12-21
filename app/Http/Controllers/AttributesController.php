<?php

namespace App\Http\Controllers;

use App\Http\Components\ModelHelperController;
use App\Models\Attributes;
use App\Models\Categorie;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Mockery\Exception;

class AttributesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return new Response(
            Attributes::all(),
            200
        );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $request->request->set('timestamps', false);
            $status = ModelHelperController::addEntityBasedOnClass(Attributes::class, $request);

            if (!$status) {
                throw new Exception('Ошибка добавления атрибута для продукта', 500);
            }

            return new Response(
                json_encode($status),
                200
            );
        } catch (Exception $exception) {
            return new Response(
                $exception->getMessage(),
                $exception->getCode()
            );
        }
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Attributes $attributes
     * @return \Illuminate\Http\Response
     */
    public function show(Attributes $attributes)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Attributes $attributes
     * @return \Illuminate\Http\Response
     */
    public function edit(Attributes $attributes)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Attributes $attributes
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Attributes $attributes)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param string $product_id
     * @return \Illuminate\Http\Response
     */
    public function destroy(string $product_id)
    {
        $attribute = Attributes::where('product_id', $product_id)->firstOrFail();
        if ($attribute->delete()) {
            return new Response(sprintf('Аттрибуты для продукта с идентификатором : %s успешно удалены', $product_id), 200);
        } else
            return new Response(sprintf('Ошибка при удаление аттрибуты для продукта с идентификатором %s', $product_id), 400);

    }
}
