<?php

namespace App\Http\Controllers;

use App\Http\Components\ApiResponse;
use App\Http\Components\ModelHelperController;
use App\Http\Components\Status;
use App\Models\Address;
use App\Models\Customers;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Http\Response;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     */
    public function index(): Response
    {
        $response = new ApiResponse(Status::OK, Order::all());
        return $response->getResponse();
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
            $entity = ModelHelperController::prepareModel(Order::class, $request);
            $status = $entity->save();

            if (!$status) {
                $response = new ApiResponse(
                    Status::SERVER_ERROR,
                    'Ошибка добавления заказа'
                );
                return $response->getResponse();
            }

            $response = new ApiResponse(
                Status::CREATED,
                $entity
            );

        } catch (QueryException $exception) {
            $message[] = $exception->getMessage();

            $customer = Customers::find($entity->customer_id);
            if ($customer == null) $message[] = 'Не существующий покупатель';

            $address = Address::find($entity->shipping_address_id);
            if ($address == null) $message[] = 'Не существующий аддресс доставки';

            $response = new ApiResponse(
                Status::BAD_REQUEST,
                $message
            );
        }
        return $response->getResponse();
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $entity = Order::find($id);

        $response = match ((bool)$entity) {
            true => new ApiResponse(Status::OK, $entity),
            false => new ApiResponse(Status::NOT_FOUND)
        };

        return $response->getResponse();
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
            $response = new ApiResponse(
                Status::OK,
                sprintf('Заказ с идентификатором : %s успешно удален', $id)
            );
        } else {
            $response = new ApiResponse(
                Status::SERVER_ERROR,
                sprintf('Ошибка при удаление заказа с идентификатором %s', $id)
            );
        }
        return $response->getResponse();
    }
}
