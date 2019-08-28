<?php

use Illuminate\Database\Eloquent\Model;

class GetPermohonanTambahUang extends Model
{
    use \AttributePermohonanTambahUang;
    use \MiscellaneousLabel;

    protected $table = 'permohonan_tu';

    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $guarded = [
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
    ];

    protected $dates = ['verified_at'];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function detail()
    {
        return $this->hasMany(\GetPermohonanTambahUangDetail::class);
    }

    public function dpa()
    {
        return $this->belongsTo(\GetDataDasarDpa::class, 'kode_dpa', 'kode_dpa');
    }

    public function spj()
    {
        return $this->hasOne(\GetSpj::class);
    }
}
