<?php

namespace App\Http\Components;

class ApiResponse
{
    private \Illuminate\Http\Response $response;

    public function __construct(Status $status, $data = null)
    {
        $this->response = new \Illuminate\Http\Response([
            'message' => $status->getMessage(),
            'data' => $data,
            'code' => $status->value
        ],
            $status->value);
    }

    public function getResponse()
    {
        return $this->response;
    }
}
