<?php

use Illuminate\Database\Eloquent\Model;

class GetStandarPerjadinTransportasi extends Model
{
    use \QueryTahun;
    use \AttributeStandarPerjadinTransportasi;

    protected $table = 'standar_perjadin_transportasi';

    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $casts = [
        'nominal' => 'double',
    ];

    protected $guarded = [
        'id',
        'tahun',
        'golongan',
        'lokasi_berangkat_id',
        'lokasi_tujuan_id',
        'nominal',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function lokasi_berangkat()
    {
        return $this->belongsTo(\GetDataDasarLokasi::class,'lokasi_berangkat_id','id');
    }

    public function lokasi_tujuan()
    {
        return $this->belongsTo(\GetDataDasarLokasi::class,'lokasi_tujuan_id','id');
    }

}
