<?php

use Illuminate\Database\Eloquent\Model;

class GetLampiranHonor extends Model
{
    use \AttributeLampiranHonor;

    protected $table = 'lampiran_honor';

    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $guarded = [
        'id',
        'jenis_anggaran',
        'tahun',
        'bulan',
        'jenis',
        'uraian',
        'kode_dpa',
        'kode_rekening',
        'kegiatan',
        'rincian',
        'tanggal',
        'subtotal',
        'pph_21',
        'pph_22',
        'pph_23',
        'total',
        'kpa_id',
        'pptk_id',
        'bendahara_id',
        'pimpinan_id',
        'status',
        'created_by',
        'updated_by',
        'verified_by',
        'printed_by',
        'printed_at',
    ];

    protected $dates = ['verified_at'];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function detail()
    {
        return $this->hasMany(\GetLampiranHonorDetail::class,'honor_id','id');
    }

    public function kpa()
    {
        return $this->belongsTo(\GetDataDasarKpa::class);
    }

    public function pptk()
    {
        return $this->belongsTo(\GetDataDasarPptk::class, 'pptk_id', 'id');
    }

    public function bendahara()
    {
        return $this->belongsTo(\GetDataDasarBendahara::class);
    }

    public function pimpinan()
    {
        return $this->belongsTo(\GetDataDasarPimpinan::class);
    }

    public function perubahan_baru1()
    {
        return $this->hasMany(\GetLampiranPerubahan::class, 'lampiran_id_baru', 'id');
    }

    public function perubahan_lama1()
    {
        return $this->hasMany(\GetLampiranPerubahan::class, 'lampiran_id_lama', 'id');
    }

    public function perubahan_baru() 
    {
        return $this->morphOne(\GetLampiranPerubahan::class, 'lampiran', 'lampiran_jenis', 'lampiran_id_baru');
    }

    public function perubahan_lama()
    {
        return $this->morphOne(\GetLampiranPerubahan::class, 'lampiran', 'lampiran_jenis', 'lampiran_id_lama');
    }

}
