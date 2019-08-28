<?php

use Illuminate\Database\Eloquent\Model;

class PostLampiranPerubahanBerkas extends Model
{
    protected $table = 'lampiran_perubahan_berkas';

    protected $fillable = [
        'id',
        'lampiran_perubahan_id',
        'nama',
        'path',
        'deskripsi',
        'created_at',
        'updated_at',
    ];

}
