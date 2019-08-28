<?php

if (!function_exists('JenisAnggaran')) {
    function JenisAnggaran()
    {
        return Getter('jenis_anggaran') ?: 'murni';
    }
}
