<?php

use Illuminate\Database\Eloquent\Model;

class GetBerkas extends Model
{
    use \AttributeBerkas;

    protected $table = 'berkas';

    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $guarded = [
        'id',
        'nama',
        'path',
        'deskripsi',
        'aktif',
        'meta',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

}
