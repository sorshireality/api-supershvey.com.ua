<?php

namespace App\Http\Components;

enum Status: int
{
    case OK = 200;
    case CREATED = 201;
    case BAD_REQUEST = 400;
    case NOT_FOUND = 404;
    case SERVER_ERROR = 500;

    public function getMessage(): string
    {
        return match ($this)
        {
            self::NOT_FOUND => 'Entity not found',
            self::OK => 'Success',
            self::CREATED => 'New entity added',
            self::BAD_REQUEST => 'Invalid input data',
            self::SERVER_ERROR => 'Server error, try later'
        };
    }
}
