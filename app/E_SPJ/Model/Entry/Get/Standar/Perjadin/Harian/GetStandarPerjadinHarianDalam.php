<?php

use Illuminate\Database\Eloquent\Model;

class GetStandarPerjadinHarianDalam extends Model
{
    use \QueryTahun;

    protected $table = 'standar_perjadin_harian_dalam';

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
        'nominal_dalam_wilayah',
        'nominal_luar_wilayah',
        'nominal_dalam_kota',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

}
