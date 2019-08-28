<?php

trait QueryKodeDpa
{

    public function scopeKodeDpa($query, $kode)
    {
        $query->where('kode_dpa', 'LIKE', $kode.'.%');
    }
}
