<?php

use Illuminate\Database\Eloquent\Model;

class GetLampiranPerjadinDetail extends Model
{
    protected $table = 'lampiran_perjadin_detail';

    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $guarded = [
        'id',
        'perjadin_id',
        'pegawai_id',
        'pegawai_nip',
        'pegawai_singkatan',
        'pegawai_nama',
        'nominal',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function perjadin()
    {
        return $this->belongsTo(\GetLampiranPerjadin::class, 'perjadin_detail_id');
    }

    public function pegawai()
    {
        return $this->belongsTo(\GetDataDasarPegawai::class);
    }

    public function biaya()
    {
        return $this->hasMany(\GetLampiranPerjadinBiaya::class, 'perjadin_detail_id');
    }

}
