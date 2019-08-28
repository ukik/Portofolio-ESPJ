<?php

use Carbon\Carbon;

trait AttributeLampiranHonor
{
    use \AccessorTanggal;

    public function __construct($attributes = array())
    {

        parent::__construct($attributes);

    }

    public function getDisplayBulanAttribute()
    {
        if (filled($this->attributes['bulan'])) {
            return Carbon::parse($this->attributes['bulan'])->format('F');
        }
    }
}
