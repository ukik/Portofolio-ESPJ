<?php

use Illuminate\Database\Eloquent\Model;

class GetDataDasarTahun extends Model
{
    protected $table = 'data_tahun';

    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $guarded = [
        'id',
        'tahun',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];
}
