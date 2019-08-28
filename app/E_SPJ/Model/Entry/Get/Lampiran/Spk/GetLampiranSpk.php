<?php

use Illuminate\Database\Eloquent\Model;

class GetLampiranSpk extends Model
{
    use \AttributeLampiranSpk;

    protected $table = 'lampiran_spk';

    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $guarded = [
        'id',
        'jenis_anggaran',
        'tahun',
        'nomor_urut',
        'nomor_spk',
        'tanggal',
        'kode_dpa',
        'kode_rekening',
        'kegiatan',
        'rincian',
        'jenis',
        'nama_pekerjaan',
        'uraian',
        'kpa_id',
        'pptk_id',
        'bendahara_id',
        'pimpinan_id',
        'rekanan_id',
        'rekanan_nama_perusahaan',
        'rekanan_nama_pimpinan',
        'rekanan_jabatan',
        'rekanan_alamat',
        'pelaksanaan_jumlah',
        'pelaksanaan_satuan',
        'terbit_lokasi',
        'terbit_tanggal',
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

    public function perubahan_baru() 
    {
        return $this->morphOne(\GetLampiranPerubahan::class, 'lampiran', 'lampiran_jenis', 'lampiran_id_baru');
    }

    public function perubahan_lama() 
    {
        return $this->morphOne(\GetLampiranPerubahan::class, 'lampiran', 'lampiran_jenis', 'lampiran_id_lama');
    }
    

    public function perubahan_baru1()
    {
        return $this->hasMany(\GetLampiranPerubahan::class, 'lampiran_id_baru', 'id');
    }

    public function perubahan_lama1()
    {
        return $this->hasMany(\GetLampiranPerubahan::class, 'lampiran_id_lama', 'id');
    }

    public function rab()
    {
        return $this->hasOne(\GetLampiranSpkRab::class, 'spk_id', 'id');
    }

    public function kpa()
    {
        return $this->belongsTo(\GetDataDasarKpa::class);
    }

    public function pptk()
    {
        return $this->belongsTo(\GetDataDasarPptk::class, 'pptk_id', 'id');
    }

}
