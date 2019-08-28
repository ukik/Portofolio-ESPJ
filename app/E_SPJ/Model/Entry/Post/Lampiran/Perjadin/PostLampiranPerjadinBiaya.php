<?php

use Illuminate\Database\Eloquent\Model;

class PostLampiranPerjadinBiaya extends Model
{
    protected $table = 'lampiran_perjadin_biaya';

    protected $fillable = [
        'id',
        'urut',
        'perjadin_id',
        'perjadin_detail_id',
        'rincian',
        'harga',
        'volume',
        'satuan',
        'jumlah',
        'keterangan',
        'created_at',
        'updated_at',       
    ];        

}
