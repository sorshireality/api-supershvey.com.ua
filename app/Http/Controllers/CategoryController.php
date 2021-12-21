<?php

namespace App\Http\Controllers;

use App\Http\Components\ModelHelperController;
use App\Models\Categorie;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): Response
    {
        return new Response(
            Categorie::all(),
            200
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request): Response
    {

        $status = ModelHelperController::addEntityBasedOnClass(Categorie::class, $request);
        if (!$status) {
            return new Response(
                'Ошибка добавления категории',
                500
            );
        }
        return new Response(
            'Категория успешно добавлен',
            200
        );
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show(int $id): Response
    {
        return new Response(
            Categorie::find($id)->get(),
            200);
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
        if (Categorie::destroy($id)) {
            return new Response(sprintf('Категория с идентификатором : %s успешно удалена', $id), 200);
        } else
            return new Response(sprintf('Ошибка при удаление категории с идентификатором %s', $id), 400);

    }
}
