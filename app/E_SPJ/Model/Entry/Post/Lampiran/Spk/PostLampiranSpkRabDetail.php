<?php

use Illuminate\Database\Eloquent\Model;

class PostLampiranSpkRabDetail extends Model
{
    protected $table = 'lampiran_spk_rab_detail';

    protected $fillable = [
        'id',
        'spk_rab_id',
        'tanggal',
        'uraian',
        'volume',
        'satuan',
        'harga',
        'jumlah',
        'created_at',
        'updated_at',
    ];

}
