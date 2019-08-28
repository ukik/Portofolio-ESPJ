<?php

use Illuminate\Database\Eloquent\Model;

class GetDataDasarPegawaiStandar extends Model
{
    protected $table = 'data_pegawai_standar';

    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $guarded = [
        'id',
        'pegawai_id',
        'perjadin_harian_dalam_id',
        'perjadin_harian_luar_id',
        'perjadin_representatif_id',
        'perjadin_hotel_dalam_id',
        'perjadin_hotel_luar_id',
        'honor_id',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function pegawai()
    {
        return $this->belongsTo(\GetDataDasarPegawai::class);
    }

}
