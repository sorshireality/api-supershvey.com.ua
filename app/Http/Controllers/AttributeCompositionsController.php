<?php

namespace App\Http\Controllers;

use App\Http\Components\ApiResponse;
use App\Http\Components\ModelHelperController;
use App\Http\Components\Status;
use App\Models\AttributeComposition;
use App\Models\Attributes;
use App\Models\Composition;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Mockery\Exception;
use PhpParser\Node\Attribute;

class AttributeCompositionsController extends Controller
{
    public function index(): Response
    {
        $response = new ApiResponse(Status::OK, AttributeComposition::all());
        return $response->getResponse();
    }

    public function store(Request $request)
    {
        try {
            $entity = ModelHelperController::prepareModel(AttributeComposition::class, $request);
            $status = $entity->save();

            if (!$status) {
                $response = new ApiResponse(
                    Status::SERVER_ERROR,
                    'Ошибка добавления состава продукта'
                );
                return $response->getResponse();
            }

            $response = new ApiResponse(
                Status::CREATED,
                $entity
            );

        } catch (QueryException $exception) {
            $message[] = $exception->getMessage();

            $attribute = Attributes::find($entity->attribute_id);
            if ($attribute == null) $message[] = 'Не существующий аттрибут';

            $material = Attributes::find($entity->material_id);
            if ($material == null) $message[] = 'Не существующий материал';

            $response = new ApiResponse(
                Status::BAD_REQUEST,
                $message
            );
        }
        return $response->getResponse();
    }

    public function destroy(string $id)
    {
        if (AttributeComposition::destroy($id)) {
            $response = new ApiResponse(
                Status::OK,
                sprintf('Состав продукта с идентификатором : %s успешно удален', $id)
            );
        } else {
            $response = new ApiResponse(
                Status::SERVER_ERROR,
                sprintf('Ошибка при удаление состава продукта с идентификатором %s', $id)
            );
        }
        return $response->getResponse();
    }
}
