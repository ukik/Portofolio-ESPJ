<?php

use Carbon\Carbon;

trait AccessorTanggalSk
{

    public function __construct($attributes = array())
    {

        parent::__construct($attributes);

    }

    public function getTanggalSkAttribute()
    {
        if (filled($this->attributes['tanggal_sk'])) {
            return Carbon::parse($this->attributes['tanggal_sk'])->format('Y-m-d');
            return Carbon::parse($this->attributes['tanggal_sk'])->format('d/m/Y');
        }
    }
}
