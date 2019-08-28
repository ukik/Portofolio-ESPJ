<?php

trait QueryJenisAnggaran
{

    public function scopeJenisAnggaran($query)
    {
        $query->whereJenisAnggaran(JenisAnggaran());
    }

}
