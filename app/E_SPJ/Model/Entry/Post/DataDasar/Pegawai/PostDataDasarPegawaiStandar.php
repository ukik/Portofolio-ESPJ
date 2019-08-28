<?php

use Illuminate\Database\Eloquent\Model;

class PostDataDasarPegawaiStandar extends Model
{
    protected $table = 'data_pegawai_standar';

    protected $fillable = [
        'id',
        'pegawai_id',
        'perjadin_harian_dalam_id',
        'perjadin_harian_luar_id',
        'perjadin_representatif_id',
        'perjadin_hotel_dalam_id',
        'perjadin_hotel_luar_id',
        'honor_id',
        'created_at',
        'updated_at',
    ];

}
