<?php

use Illuminate\Database\Eloquent\Model;

class PostPermohonanTambahUang extends Model
{

    protected $table = 'permohonan_tu';

    protected $fillable = [
        'id',
        'jenis_anggaran',
        'tahun',
        'kode_dpa',
        'kegiatan',
        'nomor_urut',
        'nomor_permohonan',
        'tanggal',
        'nominal_diajukan',
        'nominal_disetujui',
        'status',
        'created_by',
        'updated_by',
        'verified_by',
        'verified_at',
        'created_at',
        'updated_at',
    ];

}
