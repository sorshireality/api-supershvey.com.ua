<?php

namespace App\Http\Controllers;

use App\Models\Products;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): Response
    {
        $response = [];
        $products = Products::all();
        foreach ($products->toArray() as $product => $value) {
            $response[$value['id']] = $value;
        }
        return new Response(
            $response,
            200
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $product = new Products();
        $product->name = $request->get('title');
        $product->description = $request->get('desc');
        $product->quantity = $request->get('quantity');
        $product->category_id = $request->get('category_id');
        if ($product->save()) {
            return new Response(
                json_encode($product),
                200
            );
        } else {
            return new Response(
                'Ошибка добавления продукта',
                500
            );
        }
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id): Response
    {
        if (Products::destroy($id)) {
            return new Response(sprintf('Продукт с идентификатором : %s успешно удален', $id), 200);
        } else
            return new Response(sprintf('Ошибка при удаление продукта с идентификатором %s', $id), 400);
    }
}
