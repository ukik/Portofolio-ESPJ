<?php

use Illuminate\Database\Eloquent\Model;

class PostStandarPerjadinHarianLuar extends Model
{
    protected $table = 'standar_perjadin_harian_luar';

    protected $fillable = [
        'id',
        'tahun',
        'jabatan',
        'created_at',
        'updated_at',
    ];

    public function detail()
    {
        return $this->hasMany(\GetStandarPerjadinHarianLuarDetail::class, 'standar_perjadin_harian_luar_id');
    }    

}
