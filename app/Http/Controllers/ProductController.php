<?php

namespace App\Http\Controllers;

use App\Http\Components\ApiResponse;
use App\Http\Components\ModelHelperController;
use App\Http\Components\Status;
use App\Models\Categorie;
use App\Models\Products;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): Response
    {
        $response = new ApiResponse(Status::OK, Products::all());
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
            $entity = ModelHelperController::prepareModel(Products::class, $request);
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

            $category = Categorie::find($entity->category_id);
            if ($category == null) $message[] = 'Не существующая категория';

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
        $entity = Products::find($id);

        if ((bool)$entity == false) {
            $response = new ApiResponse(Status::NOT_FOUND);
            return $response->getResponse();
        }

        $category = json_decode(app('\App\Http\Controllers\CategoryController')->show($entity->category_id)->getContent())->data;
        $entity->category = $category;
        unset($entity->category_id);

        $attributes = json_decode(app('\App\Http\Controllers\AttributesController')->show($entity->id)->getContent())->data;
        $entity->attributes = $attributes;
        unset($entity->attributes->product_id);

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
    public function destroy(int $id): Response
    {
        if (Products::destroy($id)) {
            $response = new ApiResponse(
                Status::OK,
                sprintf('Продукт с идентификатором : %s успешно удален', $id)
            );
        } else {
            $response = new ApiResponse(
                Status::SERVER_ERROR,
                sprintf('Ошибка при удаление продукта с идентификатором %s', $id)
            );
        }
        return $response->getResponse();
    }
}
