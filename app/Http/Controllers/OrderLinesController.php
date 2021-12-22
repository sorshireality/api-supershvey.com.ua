<?php

namespace App\Http\Controllers;

use App\Http\Components\ModelHelperController;
use App\Models\OrderLines;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class OrderLinesController extends Controller
{
    public function index()
    {
        return new Response(
            OrderLines::all(),
            200);
    }

    public function store($request): Response
    {
        $status = ModelHelperController::addEntityBasedOnClass(OrderLines::class, $request);
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

    public function destroy(string $id): Response
    {
        if (OrderLines::destroy($id)) {
            return new Response(sprintf('Строка заказа с идентификатором : %s успешно удалена', $id), 200);
        } else
            return new Response(sprintf('Ошибка при удаление строки заказа с идентификатором %s', $id), 400);
    }
}
