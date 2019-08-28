<?php

use Illuminate\Database\Eloquent\Model;

class PostLampiranPerjadin extends Model
{
    protected $table = 'lampiran_perjadin';

    protected $fillable = [
        'id',
        'jenis_anggaran',
        'tahun',
        'kode_dpa',
        'kode_rekening',
        'kegiatan',
        'rincian',
        'nomor_urut',
        'nomor_spt',
        'tanggal',
        'uraian',
        'lokasi_id',
        'lokasi_nama',
        'tempat_tujuan',
        'nominal',
        'tanggal_berangkat',
        'tanggal_kembali',
        'lama_perjalanan',
        'keterangan',
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


    public function perubahan_baru() 
    {
        return $this->morphOne(\GetLampiranPerubahan::class, 'lampiran', 'lampiran_jenis', 'lampiran_id_baru');
    }

    public function perubahan_lama() 
    {
        return $this->morphOne(\GetLampiranPerubahan::class, 'lampiran', 'lampiran_jenis', 'lampiran_id_lama');
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

    public function detail()
    {
        return $this->hasMany(\GetLampiranPerjadinDetail::class, 'perjadin_id', 'id');
    }

    public function biaya()
    {
        return $this->hasMany(\GetLampiranPerjadinBiaya::class, 'perjadin_id', 'id');
    }    

}
