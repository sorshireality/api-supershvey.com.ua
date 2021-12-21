<?php

namespace App\Http\Components;

class ModelHelperController
{
    static function addEntityBasedOnClass($class, $request)
    {
        $obj = new $class();
        foreach ($request->request->all() as $key => $value) {
            $obj->$key = $value;
        }

        if (!$obj->save()) {
            return false;
        };
        return $obj;
    }
}
