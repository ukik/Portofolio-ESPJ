<?php

use Illuminate\Database\Eloquent\Model;

class GetStandarHonor extends Model
{
    use \QueryTahun;
    
    protected $table = 'standar_honor';

    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $casts = [
        'nominal' => 'double',
    ];

    protected $guarded = [
        'id',
        'tahun',
        'golongan',
        'label',
        'nominal',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

}
