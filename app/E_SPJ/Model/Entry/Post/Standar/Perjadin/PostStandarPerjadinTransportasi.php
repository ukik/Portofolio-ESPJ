<?php

use Illuminate\Database\Eloquent\Model;

class PostStandarPerjadinTransportasi extends Model
{
    protected $table = 'standar_perjadin_transportasi';

    protected $fillable = [
        'id',
        'tahun',
        'golongan',
        'lokasi_berangkat_id',
        'lokasi_tujuan_id',
        'nominal',
        'created_at',
        'updated_at',
    ];

}
