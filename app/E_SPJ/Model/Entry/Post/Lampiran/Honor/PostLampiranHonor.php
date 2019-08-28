<?php

use Illuminate\Database\Eloquent\Model;

class PostLampiranHonor extends Model
{
    protected $table = 'lampiran_honor';

    protected $fillable = [
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
        'verified_at',
        'created_at',
        'updated_at',
    ];

    public function detail()
    {
        return $this->hasMany(\GetLampiranHonorDetail::class,'honor_id','id');
    }

}
