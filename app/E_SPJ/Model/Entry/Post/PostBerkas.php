<?php

use Illuminate\Database\Eloquent\Model;

class PostBerkas extends Model
{
    protected $table = 'berkas';

    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'nama',
        'path',
        'deskripsi',
        'aktif',
        'meta',
        'created_at',
        'updated_at',
    ];

}
