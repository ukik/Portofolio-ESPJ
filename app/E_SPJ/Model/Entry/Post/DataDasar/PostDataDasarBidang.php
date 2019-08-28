<?php

use Illuminate\Database\Eloquent\Model;

class PostDataDasarBidang extends Model
{
    protected $table = 'data_bidang';

    protected $fillable = [
        'id',
        'tahun',
        'induk_id',
        'nama',
        'singkatan',
        'kode_surat',
        'created_at',
        'updated_at',       
    ];   

}
