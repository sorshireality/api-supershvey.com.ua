<?php

namespace App\Http\Components;

class ModelHelperController
{
    /**
     * @param $class
     * @param $request
     * @return \Illuminate\Database\Eloquent\Model
     */
    static function prepareModel($class, $request): object
    {
        $obj = new $class();
        foreach ($request->request->all() as $key => $value) {
            $obj->$key = $value;
        }

        return $obj;
    }
}
