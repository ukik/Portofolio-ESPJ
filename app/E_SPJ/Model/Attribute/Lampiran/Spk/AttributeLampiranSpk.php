<?php

use Carbon\Carbon;

trait AttributeLampiranSpk
{
    use \AccessorTanggal;

    public function __construct($attributes = array())
    {

        parent::__construct($attributes);

    }

    public function getTerbitTanggalAttribute()
    {
        if (filled($this->attributes['terbit_tanggal'])) {
            return Carbon::parse($this->attributes['terbit_tanggal'])->format('d/m/Y');
        }
    }
}
