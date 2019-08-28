<?php

use Illuminate\Database\Eloquent\Model;

class PostDataDasarPegawai extends Model
{
    protected $table = 'data_pegawai';

    protected $fillable = [
        'id',
        'tahun',
        'bidang_id',
        'nip',
        'nama',
        'gelar_depan',
        'gelar_belakang',
        'singkatan',
        'tempat_lahir',
        'tanggal_lahir',
        'jenis_kelamin',
        'jenis',
        'instansi',
        'pendidikan',
        'golongan',
        'jabatan',
        'npwp',
        'email',
        'telegram',
        'whatsapp',
        'telp',
        'alamat',
        'created_at',
        'updated_at',
    ];

    public function bidang()
    {
        return $this->belongsTo(\GetDataDasarBidang::class, 'bidang_id');
    }

    public function standar()
    {
        return $this->hasOne(\GetDataDasarPegawaiStandar::class,'pegawai_id','id');
    }    

}
