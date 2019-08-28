<?php

use Illuminate\Database\Eloquent\Model;

class PostStandarPerjadinHarianLuarDetail extends Model
{
    protected $table = 'standar_perjadin_harian_luar_detail';

    protected $fillable = [
        'id',
        'standar_perjadin_harian_luar_id',
        'lokasi_ln_id',
        'nominal',
        'created_at',
        'updated_at',
    ];

}
