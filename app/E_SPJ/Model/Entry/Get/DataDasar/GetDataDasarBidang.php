<?php

use Illuminate\Database\Eloquent\Model;

class GetDataDasarBidang extends Model
{
    use \QueryTahun;

    protected $table = 'data_bidang';
    
    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $guarded = [
        'id',
        'tahun',
        'induk_id',
        'nama',
        'singkatan',
        'kode_surat',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',       
    ];   

    public function pegawai()
    {
        return $this->hasMany(\GetDataDasarPegawai::class,'id','pegawai_id');
    }

    public function sub()
    {
        return $this->hasMany(\GetDataDasarBidang::class, 'induk_id');
    }
}
