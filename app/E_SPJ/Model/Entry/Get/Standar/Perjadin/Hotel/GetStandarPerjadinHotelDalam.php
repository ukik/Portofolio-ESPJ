<?php

use Illuminate\Database\Eloquent\Model;

class GetStandarPerjadinHotelDalam extends Model
{
    use \QueryTahun;

    protected $table = 'standar_perjadin_hotel_dalam';

    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $casts = [
        'nominal_dalam_wilayah' => 'double',
        'nominal_luar_wilayah' => 'double',
        'nominal_dalam_kota' => 'double',
    ];

    protected $guarded = [
        'id',
        'tahun',
        'jabatan',
        'nominal',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

}
