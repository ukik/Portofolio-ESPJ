<?php

trait QueryAktif
{

    public function scopeAktif($query, $aktif = 1)
    {
        $query->whereAktif($aktif);
    }
}
