<?php

use Illuminate\Database\Eloquent\Model;

class PostStandarPerjadinHotelLuar extends Model
{
    protected $table = 'standar_perjadin_hotel_luar';

    protected $fillable = [
        'id',
        'tahun',
        'jabatan',
        'created_at',
        'updated_at',
    ];

    public function detail()
    {
        return $this->hasMany(\GetStandarPerjadinHotelLuarDetail::class, 'standar_perjadin_hotel_luar_id');
    }    
}
