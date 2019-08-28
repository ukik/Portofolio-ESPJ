<?php

use Illuminate\Database\Eloquent\Model;

class GetSpj extends Model
{
    use \AttributeSpj;

    protected $table = 'spj';

    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $guarded = [
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
    ];

    protected $dates = ['verified_at'];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function permohonan() 
    {
        return $this->belongsTo(\GetPermohonanGantiUang::class, 'permohonan_id');
    }

    public function berkas()
    {
        return $this->hasMany(\GetSpjBerkas::class,'spj_id','id');
    }

    public function rekap()
    {
        return $this->hasMany(\GetSpjRekap::class,'spj_id','id');
    }

    public function dpa()
    {
        return $this->belongsTo(\GetDataDasarDpa::class, 'kode_dpa', 'kode_dpa');
    }

}
