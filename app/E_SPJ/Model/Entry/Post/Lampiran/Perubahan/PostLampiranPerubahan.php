<?php

use Illuminate\Database\Eloquent\Model;

class PostLampiranPerubahan extends Model
{
    protected $table = 'lampiran_perubahan';

    protected $fillable = [
        'id',
        'lampiran_jenis',
        'lampiran_id_lama',
        'lampiran_id_baru',
        'nomor_lama',
        'nomor_baru',
        'created_at',
        'updated_at',
    ];

}
