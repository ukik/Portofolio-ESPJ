<?php

use Carbon\Carbon;

trait AccessorTanggal
{

    public function __construct($attributes = array())
    {

        parent::__construct($attributes);

    }

    public function getTanggalAttribute()
    {
        if (filled($this->attributes['tanggal'])) {
            return Carbon::parse($this->attributes['tanggal'])->format('Y-m-d');
            return Carbon::parse($this->attributes['tanggal'])->format('d/m/Y');
        }
    }
}
