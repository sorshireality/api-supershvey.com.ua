<?php

namespace App\Http\Controllers;

use App\Http\Components\ModelHelperController;
use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use function React\Promise\all;

class AddressController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): \Illuminate\Http\Response
    {
        return new Response(
            \App\Models\Address::all(),
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
        $status = ModelHelperController::addEntityBasedOnClass(\App\Models\Address::class, $request);
        if (!$status) {
            return new Response(
                'Ошибка добавления покупателя',
                500
            );
        }
        return new Response(
            'Покупатель успешно добавлен',
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
        if (Address::destroy($id)) {
            return new Response(sprintf('Адресс с идентификатором : %s успешно удален', $id), 200);
        } else
            return new Response(sprintf('Ошибка при удаление адресса с идентификатором %s', $id), 400);

    }
}
