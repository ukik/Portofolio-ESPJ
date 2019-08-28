<?php

use Illuminate\Database\Eloquent\Model;

class GetStandarPerjadinHarianLuar extends Model
{
    use \QueryTahun;

    protected $table = 'standar_perjadin_harian_luar';

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
        return $this->hasMany(\GetStandarPerjadinHarianLuarDetail::class, 'standar_perjadin_harian_luar_id');
    }
}
