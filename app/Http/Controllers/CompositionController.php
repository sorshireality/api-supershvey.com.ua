<?php

namespace App\Http\Controllers;

use App\Http\Components\ModelHelperController;
use App\Models\Composition;
use Illuminate\Http\Response;

class CompositionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): Response
    {
        return new Response(
            Composition::all(),
            200
        );
    }

    /**
     * Add new entity
     *
     * @param $request
     * @return \Illuminate\Http\Response
     */
    public function store($request): Response
    {
        $status = ModelHelperController::addEntityBasedOnClass(Composition::class, $request);
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
     * Remove material by id
     *
     * @param $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id): Response
    {
        if (Composition::destroy($id)) {
            return new Response(sprintf('Материал с идентификатором : %s успешно удален', $id), 200);
        } else
            return new Response(sprintf('Ошибка при удаление материала с идентификатором %s', $id), 400);

    }
}
