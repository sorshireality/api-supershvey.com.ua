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
        if ((bool)$entity == false) {
            $response = new ApiResponse(Status::NOT_FOUND);
            return $response->getResponse();
        }

        $customer = json_decode(app('\App\Http\Controllers\CustomerController')->show($entity->customer_id)->getContent())->data;
        $address = json_decode(app('\App\Http\Controllers\AddressController')->show($entity->shipping_address_id)->getContent())->data;

        $entity->customer = $customer;
        unset($entity->customer_id);
        $entity->address = $address;
        unset($entity->shipping_address_id);
        $entity->order_lines = json_decode($this->showOrderLines($id)->getContent())->data;
        $entity->amount = 0;
        foreach ($entity->order_lines as $line) {
            $line->product = json_decode(app('\App\Http\Controllers\ProductController')->show($line->product_id)->getContent())->data;
            $entity->amount += ($line->product->attributes->price * $line->quantity);
            unset($line->product_id);
        }

        $response = new ApiResponse(Status::OK, $entity);
        return $response->getResponse();
    }

    /**
     * @param $id
     * @return \Illuminate\Http\Response
     */
    public function showOrderLines($id)
    {
        $order_lines = OrderLines::where('order_id', $id)->get();
        $response = new ApiResponse(Status::OK, $order_lines);
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
        $entity = Order::find($id);
        $name = $request->name;
        $entity->$name = $request->value;

        $entity->save();

        return (new ApiResponse(Status::OK, $entity))->getResponse();
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
