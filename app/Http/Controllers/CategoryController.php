<?php

namespace App\Http\Controllers;

use App\Http\Components\ApiResponse;
use App\Http\Components\ModelHelperController;
use App\Http\Components\Status;
use App\Models\Categorie;
use Illuminate\Database\QueryException;
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
        $response = new ApiResponse(Status::OK, Categorie::all());
        return $response->getResponse();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request): Response
    {
        try {
            $entity = ModelHelperController::prepareModel(Categorie::class, $request);
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
    public function show(int $id): Response
    {
        $entity = Categorie::find($id);

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
        if (Categorie::destroy($id)) {
            return new Response(sprintf('Категория с идентификатором : %s успешно удалена', $id), 200);
        } else
            return new Response(sprintf('Ошибка при удаление категории с идентификатором %s', $id), 400);

    }
}
