<?php

class AddingEntityException extends Exception
{
    public function __construct(Status $status, $custom_message = "")
    {
        $this->code = $status->value;
        $this->message = $status->getMessage();
    }
}
