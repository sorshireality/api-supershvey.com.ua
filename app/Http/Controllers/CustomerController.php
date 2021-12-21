<?php

namespace App\Http\Controllers;

use App\Models\Customers;
use App\Models\Order;
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
        return new Response(
            \App\Models\Customers::all(),
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
        $customer = new Customers();
        $customer->name = $request->get('name');
        $customer->lastname = $request->get('lastname');
        $customer->phone = $request->get('phone');
        $customer->email = $request->get('email');
        $customer->billing_address_id = $request->get('billing_address_id');
        if ($customer->save()) {
            return new Response(
                'Покупатель успешно добавлен',
                200
            );
        } else {
            return new Response(
                'Ошибка добавления покупателя',
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
        if (\App\Models\Customers::destroy($id)) {
            return new Response(sprintf('Покупатель с идентификатором : %s успешно удален', $id), 200);
        } else
            return new Response(sprintf('Ошибка при удаление покупателя с идентификатором %s', $id), 400);
    }
}
