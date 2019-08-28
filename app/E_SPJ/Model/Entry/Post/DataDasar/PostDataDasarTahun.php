<?php

use Illuminate\Database\Eloquent\Model;

class PostDataDasarTahun extends Model
{
    protected $table = 'data_tahun';

    protected $fillable = [
        'id',
        'tahun',
        'created_at',
        'updated_at',
    ];
}
