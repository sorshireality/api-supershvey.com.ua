<?php

namespace App\Http\Controllers;

use App\Http\Components\ApiResponse;
use App\Http\Components\ModelHelperController;
use App\Http\Components\Status;
use App\Models\Order;
use App\Models\OrderLines;
use App\Models\Products;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class OrderLinesController extends Controller
{
    public function index()
    {
        if (isset($_GET['order_id'])) {
            return $this->showByOrderId($_GET['order_id']);
        }
        $response = new ApiResponse(Status::OK, OrderLines::all());
        return $response->getResponse();
    }

    public function showByOrderId($id)
    {
        $entity = OrderLines::where('order_id', $id)->get();
        $response = new ApiResponse(Status::OK, $entity);
        return $response->getResponse();
    }

    public function show($id)
    {
        $entity = OrderLines::find($id);

        $response = match ((bool)$entity) {
            true => new ApiResponse(Status::OK, $entity),
            false => new ApiResponse(Status::NOT_FOUND)
        };

        return $response->getResponse();
    }

    public function store(Request $request): Response
    {
        try {
            $entity = ModelHelperController::prepareModel(OrderLines::class, $request);
            $status = $entity->save();

            if (!$status) {
                $response = new ApiResponse(
                    Status::SERVER_ERROR,
                    'Ошибка добавления линии заказа'
                );
                return $response->getResponse();
            }

            $response = new ApiResponse(
                Status::CREATED,
                $entity
            );

        } catch (QueryException $exception) {
            $message[] = $exception->getMessage();

            $order = Order::find($entity->order_id);
            if ($order == null) $message[] = 'Не существующий заказ';

            $product = Products::find($entity->product_id);
            if ($product == null) $message[] = 'Не существующий продукт';

            $response = new ApiResponse(
                Status::BAD_REQUEST,
                $message
            );
        }
        return $response->getResponse();
    }

    public function destroy(string $id): Response
    {
        if (OrderLines::destroy($id)) {
            $response = new ApiResponse(
                Status::OK,
                sprintf('Линия заказа с идентификатором : %s успешно удален', $id)
            );
        } else {
            $response = new ApiResponse(
                Status::SERVER_ERROR,
                sprintf('Ошибка при удаление линии заказа с идентификатором %s', $id)
            );
        }
        return $response->getResponse();
    }
}
