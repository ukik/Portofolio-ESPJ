<?php

use Illuminate\Database\Eloquent\Model;

class PostStandarPerjadinRepresentatif extends Model
{
    protected $table = 'standar_perjadin_representatif';

    protected $fillable = [
        'id',
        'tahun',
        'jabatan',
        'nominal_dalam_wilayah',
        'nominal_luar_wilayah',
        'created_at',
        'updated_at',
    ];

}
