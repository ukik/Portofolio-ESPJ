<?php

use Illuminate\Database\Eloquent\Model;

class GetStandarPerjadinHotelLuarDetail extends Model
{
    use \QueryTahun;

    protected $table = 'standar_perjadin_hotel_luar_detail';

    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $casts = [
        'nominal' => 'double',
    ];

    protected $guarded = [
        'id',
        'standar_perjadin_hotel_luar_id',
        'lokasi_id',
        'nominal',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function induk()
    {
        return $this->belongsTo(\GetStandarPerjadinHotelLuar::class, 'standar_perjadin_hotel_luar_id');
    }
}
