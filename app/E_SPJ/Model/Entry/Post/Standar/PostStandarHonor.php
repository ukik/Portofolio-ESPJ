<?php

use Illuminate\Database\Eloquent\Model;

class PostStandarHonor extends Model
{
    protected $table = 'standar_honor';

    protected $fillable = [
        'id',
        'tahun',
        'golongan',
        'label',
        'nominal',
        'created_at',
        'updated_at',
    ];

}
