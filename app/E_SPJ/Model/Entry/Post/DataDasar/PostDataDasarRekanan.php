<?php

use Illuminate\Database\Eloquent\Model;

class PostDataDasarRekanan extends Model
{
    protected $table = 'data_rekanan';

    protected $fillable = [
        'id',
        'tahun',
        'nama_perusahaan',
        'nama_pimpinan',
        'npwp',
        'telp',
        'fax',
        'email',
        'website',
        'alamat',
        'aktif',
        'created_at',
        'updated_at',
    ];
}
