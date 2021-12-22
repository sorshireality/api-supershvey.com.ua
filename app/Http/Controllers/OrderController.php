<?php

namespace App\Http\Controllers;

use App\Http\Components\ModelHelperController;
use App\Models\Address;
use App\Models\Customers;
use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Http\Response;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return \Illuminate\Http\Response
     */
    public function index(): Response
    {
        return new Response(
            Order::all(),
            200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $status = ModelHelperController::addEntityBasedOnClass(Order::class, $request);
        if (!$status) {
            return new Response(
                'Ошибка добавления заказа',
                500
            );
        }
        return new Response(
            'Заказ успешно добавлен',
            200
        );
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
    public function destroy($id)
    {
        if (Order::destroy($id)) {
            return new Response('Заказ с идентификатором : %s успешно удален', 200);
        } else
            return new Response('Ошибка при удаление заказа с идентификатором %s', 400);
    }
}
