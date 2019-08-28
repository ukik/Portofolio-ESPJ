<?php

use Illuminate\Database\Eloquent\Model;

class GetStandarPerjadinRepresentatif extends Model
{
    use \QueryTahun;

    protected $table = 'standar_perjadin_representatif';

    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $casts = [
        'nominal' => 'double',
    ];

    protected $guarded = [
        'id',
        'tahun',
        'jabatan',
        'nominal_dalam_wilayah',
        'nominal_luar_wilayah',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

}
