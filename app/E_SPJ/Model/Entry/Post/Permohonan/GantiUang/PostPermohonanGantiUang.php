<?php

use Illuminate\Database\Eloquent\Model;

class PostPermohonanGantiUang extends Model
{

    protected $table = 'permohonan_gu';

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

    public function detail()
    {
        return $this->hasMany(\GetPermohonanGantiUangDetail::class, 'permohonan_id');
    }

    public function spj()
    {
        return $this->morphOne(\GetSpj::class,'permohonan','permohonan_jenis','permohonan_id');
    }    

    public function spj1()
    {
        return $this->belongsTo(\GetSpj::class, 'id','permohonan_id');
    }    
}
