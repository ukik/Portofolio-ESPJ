<?php

use Illuminate\Database\Eloquent\Model;

class PostStandarPerjadinHotelDalam extends Model
{
    protected $table = 'standar_perjadin_hotel_dalam';

    protected $fillable = [
        'id',
        'tahun',
        'jabatan',
        'nominal',
        'created_at',
        'updated_at',
    ];

}
