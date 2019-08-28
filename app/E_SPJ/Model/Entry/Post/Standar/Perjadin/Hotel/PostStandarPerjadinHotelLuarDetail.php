<?php

use Illuminate\Database\Eloquent\Model;

class PostStandarPerjadinHotelLuarDetail extends Model
{
    protected $table = 'standar_perjadin_hotel_luar_detail';

    protected $fillable = [
        'id',
        'standar_perjadin_hotel_luar_id',
        'lokasi_id',
        'nominal',
        'created_at',
        'updated_at',
    ];

}
