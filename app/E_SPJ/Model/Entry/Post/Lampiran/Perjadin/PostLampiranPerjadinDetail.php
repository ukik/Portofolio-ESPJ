<?php

use Illuminate\Database\Eloquent\Model;

class PostLampiranPerjadinDetail extends Model
{
    protected $table = 'lampiran_perjadin_detail';

    protected $fillable = [
        'id',
        'perjadin_id',
        'pegawai_id',
        'pegawai_nip',
        'pegawai_singkatan',
        'pegawai_nama',
        'nominal',
        'created_at',
        'updated_at',
    ];

    public function biaya()
    {
        return $this->hasMany(\GetLampiranPerjadinBiaya::class, 'perjadin_detail_id');
    }

}
