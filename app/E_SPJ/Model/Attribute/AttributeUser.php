<?php

trait AttributeUser
{
    public function __construct($attributes = array())
    {

        parent::__construct($attributes);

    }

    public function getAvatarAttribute()
    {
        $nama = $this->nama;
        $temp = explode(' ', $nama);
        if (count($temp) > 1) {
            $first = array_get($temp, 0);
            $second = array_get($temp, 1);

            $first = substr($first, 0, 1);
            $second = substr($second, 0, 1);

            $result = $first . $second;
        } else {
            $result = substr($nama, 0, 2);
        }

        return strtoupper($result);
    }

}
