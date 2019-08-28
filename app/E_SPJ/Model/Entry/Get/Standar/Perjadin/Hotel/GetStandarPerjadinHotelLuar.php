<?php

use Illuminate\Database\Eloquent\Model;

class GetStandarPerjadinHotelLuar extends Model
{
    use \QueryTahun;

    protected $table = 'standar_perjadin_hotel_luar';

    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $guarded = [
        'id',
        'tahun',
        'jabatan',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function detail()
    {
        return $this->hasMany(\GetStandarPerjadinHotelLuarDetail::class, 'standar_perjadin_hotel_luar_id');
    }
}
