<?php

use Illuminate\Database\Eloquent\Model;

class GetDataDasarRekanan extends Model
{
    protected $table = 'data_rekanan';

    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $guarded = [
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
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];
}
