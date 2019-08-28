<?php

trait QueryTahun
{

    public function scopeTahun($query)
    {
        $query->whereTahun(Tahun());
    }

}
