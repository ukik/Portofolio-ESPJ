<?php

use Illuminate\Database\Eloquent\Model;

class GetStandarPerjadinHarianLuarDetail extends Model
{
    use \QueryTahun;

    protected $table = 'standar_perjadin_harian_luar_detail';

    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $casts = [
        'nominal' => 'double',
    ];

    protected $guarded = [
        'id',
        'standar_perjadin_harian_luar_id',
        'lokasi_ln_id',
        'nominal',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function induk()
    {
        return $this->belongsTo(\GetStandarPerjadinHarianLuar::class, 'standar_perjadin_harian_luar_id');
    }
}
