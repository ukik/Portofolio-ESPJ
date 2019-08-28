<?php

use Illuminate\Database\Eloquent\Model;

class PostStandarPerjadinHarianDalam extends Model
{
    protected $table = 'standar_perjadin_harian_dalam';

    protected $fillable = [
        'id',
        'tahun',
        'jabatan',
        'nominal_dalam_wilayah',
        'nominal_luar_wilayah',
        'nominal_dalam_kota',
        'created_at',
        'updated_at',
    ];

}
