<?php

use Illuminate\Database\Eloquent\Model;

class PostPermohonanUangPersediaan extends Model
{

    protected $table = 'permohonan_up';

    protected $fillable = [
        'id',
        'jenis_anggaran',
        'tahun',
        'uraian',
        'tanggal',
        'nominal_sebelum',
        'nominal_pemakaian',
        'nominal_persediaan',
        'nominal_saldo',
        'created_by',
        'updated_by',
        'created_at',
        'updated_at',
    ];
}
