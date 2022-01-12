<?php

namespace App\Http\Controllers;

use App\Http\Components\ApiResponse;
use App\Http\Components\ModelHelperController;
use App\Http\Components\Status;
use App\Models\Composition;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Mockery\Exception;

class CompositionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): Response
    {
        $response = new ApiResponse(Status::OK, Composition::all());
        return $response->getResponse();
    }

    public function show($id): Response
    {
        $entity = Composition::find($id);

        $response = match ((bool)$entity) {
            true => new ApiResponse(Status::OK, $entity),
            false => new ApiResponse(Status::NOT_FOUND)
        };

        return $response->getResponse();
    }

    /**
     * Add new entity
     *
     * @param $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request): Response
    {
        try {
            $entity = ModelHelperController::prepareModel(Composition::class, $request);
            $status = $entity->save();

            if (!$status) {
                $response = new ApiResponse(
                    Status::SERVER_ERROR,
                    'Failed adding composition'
                );
                return $response->getResponse();
            }

            $response = new ApiResponse(
                Status::CREATED,
                $entity
            );

        } catch (QueryException $exception) {
            $response = new ApiResponse(
                Status::SERVER_ERROR,
                $exception->getMessage()
            );
        }
        return $response->getResponse();

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
            $response = new ApiResponse(
                Status::OK,
                sprintf('Материал с идентификатором : %s успешно удален', $id)
            );
        } else {
            $response = new ApiResponse(
                Status::SERVER_ERROR,
                sprintf('Ошибка при удаление материала с идентификатором %s', $id)
            );
        }
        return $response->getResponse();
    }


}
