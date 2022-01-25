<?php

namespace App\Http\Controllers;

use App\Http\Components\ApiResponse;
use App\Http\Components\ModelHelperController;
use App\Http\Components\Status;
use App\Models\Address;
use App\Models\Customers;
use App\Models\OrderLines;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Http\Response;
use phpDocumentor\Reflection\Types\Object_;

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

    public function _list()
    {
        $orders = Order::all();
        $response = [];
        foreach ($orders as $order) {
            $current_info = new \stdClass();
            $customer_info = Customers::find($order->customer_id);
            $current_info->customer = $customer_info;

            $order_lines = OrderLines::where('order_id', $order->id);

            foreach ($order_lines as $line) {
                dd($line);
            }

            $response [] = $customer_info;
        }
        dd($response);
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
        /** @var Order|bool $entity */
        $entity = Order::find($id);
        if ((bool)$entity) new ApiResponse(Status::NOT_FOUND);

        $customer = json_decode(app('\App\Http\Controllers\CustomerController')->show($entity->customer_id)->getContent())->data;
        $address = json_decode(app('\App\Http\Controllers\AddressController')->show($entity->shipping_address_id)->getContent())->data;

        $entity->customer = $customer;
        unset($entity->customer_id);
        $entity->address = $address;
        unset($entity->shipping_address_id);

        $response = new ApiResponse(Status::OK, $entity);
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
