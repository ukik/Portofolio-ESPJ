<?php

trait AccessorUrl
{

    public function __construct($attributes = array())
    {

        parent::__construct($attributes);

        $this->appends = [
            'url',
        ];

    }

    public function getUrlAttribute()
    {
        return url($this->path);
    }
}
