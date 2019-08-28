<?php

use Illuminate\Database\Eloquent\Model;

class PostSpj extends Model
{
    protected $table = 'spj';

    protected $fillable = [
        'id',
        'jenis_anggaran',
        'tahun',
        'permohonan_jenis',
        'permohonan_id',
        'kode_dpa',
        'kegiatan',
        'tanggal',
        'nominal_diajukan',
        'nominal_disetujui',
        'nominal_spj',
        'nominal_sisa',
        'status',
        'catatan',
        'created_by',
        'updated_by',
        'verified_by',
        'verified_at',
        'created_at',
        'updated_at',
    ];

    public function permohonan() 
    {
        return $this->hasOne(\PostPermohonanGantiUang::class, 'id', 'permohonan_id');
    }

    public function berkas()
    {
        return $this->hasMany(\PostSpjBerkas::class,'spj_id','id');
    }   
    
    public function rekap()
    {
        return $this->hasMany(\PostSpjRekap::class,'spj_id','id');
    }
    
}
