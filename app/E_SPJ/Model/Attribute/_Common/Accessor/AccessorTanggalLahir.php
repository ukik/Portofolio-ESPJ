<?php

use Carbon\Carbon;

trait AccessorTanggalLahir
{

    public function __construct($attributes = array())
    {

        parent::__construct($attributes);

    }

    public function getTanggalLahirAttribute()
    {
        if (filled($this->attributes['tanggal_lahir'])) {
            return Carbon::parse($this->attributes['tanggal_lahir'])->format('Y-m-d');
            return Carbon::parse($this->attributes['tanggal_lahir'])->format('d/m/Y');
        }
    }
}
