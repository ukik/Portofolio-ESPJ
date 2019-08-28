<?php

use Illuminate\Database\Eloquent\Model;

class PostSpjBerkas extends Model
{
    protected $table = 'spj_berkas';

    protected $fillable = [
        'id',
        'spj_id',
        'permohonan_id',
        'permohonan_detail_id',
        'lampiran_type',
        'lampiran_id',
        'jenis',
        'nomor',
        'nama',
        'path',
        'deskripsi',
        'created_at',
        'updated_at',
    ];

}
