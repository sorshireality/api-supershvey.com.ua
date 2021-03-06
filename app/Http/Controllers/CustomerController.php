<?php

namespace App\Http\Controllers;

use App\Http\Components\ApiResponse;
use App\Http\Components\ModelHelperController;
use App\Http\Components\Status;
use App\Models\Address;
use App\Models\Composition;
use App\Models\Customers;
use App\Models\Order;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return \Illuminate\Http\Response
     */
    public function index(): Response
    {
        $response = new ApiResponse(Status::OK, Customers::all());
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
            $entity = ModelHelperController::prepareModel(Customers::class, $request);
            $status = $entity->save();

            if (!$status) {
                $response = new ApiResponse(
                    Status::SERVER_ERROR,
                    'Failed adding customer'
                );
                return $response->getResponse();
            }

            $response = new ApiResponse(
                Status::CREATED,
                $entity
            );

        } catch (QueryException $exception) {
            $message[] = $exception->getMessage();

            $address = Address::find($entity->billing_address_id);
            if ($address == null) $message[] = 'Не существующий адресс';

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
        $entity = Customers::find($id);

        if ((bool)$entity == false) {
            $response = new ApiResponse(Status::NOT_FOUND);
            return $response->getResponse();
        }

        $address = json_decode(app('\App\Http\Controllers\AddressController')->show($entity->billing_address_id)->getContent())->data;

        $entity->billing_address = $address;
        unset($entity->billing_address_id);

        $response = new ApiResponse(Status::OK, $entity);
        return $response->getResponse();
    }

    public function showOrders($id)
    {
        $entity = Order::all()->where("customer_id", $id);
        $response = [];
        foreach ($entity as $single) {
            $response[] = json_decode(app('\App\Http\Controllers\OrderController')->show($single->id)->getContent())->data;


        }
        if ((bool)$entity == false) {
            $response = new ApiResponse(Status::NOT_FOUND);
            return $response->getResponse();
        }

        return (new ApiResponse(Status::OK, data: $response))->getResponse();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, int $id)
    {
        $entity = Customers::find($id);
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
    public function destroy(int $id): Response
    {
        if (Customers::destroy($id)) {
            $response = new ApiResponse(
                Status::OK,
                sprintf('Покупатель с идентификатором : %s успешно удален', $id)
            );
        } else {
            $response = new ApiResponse(
                Status::SERVER_ERROR,
                sprintf('Ошибка при удаление покупателя с идентификатором %s', $id)
            );
        }
        return $response->getResponse();
    }
}
