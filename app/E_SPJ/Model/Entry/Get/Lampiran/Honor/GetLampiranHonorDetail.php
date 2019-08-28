<?php

use Illuminate\Database\Eloquent\Model;

class GetLampiranHonorDetail extends Model
{
    protected $table = 'lampiran_honor_detail';
    
    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $guarded = [
        'id',
        'honor_id',
        'pegawai_id',
        'pegawai_nama',
        'jabatan_id',
        'jabatan_nama',
        'jabatan_struktural',
        'volume',
        'satuan',
        'jumlah',
        'subtotal',
        'pph_21_persen',
        'pph_21_nilai',
        'pph_22_persen',
        'pph_22_nilai',
        'pph_23_persen',
        'pph_23_nilai',
        'total',
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

    public function honor()
    {
        return $this->belongsTo(\GetLampiranHonor::class);
    }

    public function pegawai()
    {
        return $this->belongsTo(\GetDataDasarPegawai::class);
    }
  
}
