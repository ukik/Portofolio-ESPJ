<?php

use Illuminate\Database\Eloquent\Model;

class GetDataDasarPegawai extends Model
{
    use \AttributeDataDasarPegawai;

    protected $table = 'data_pegawai';

    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $guarded = [
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
    ];

    protected $hidden = [
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
