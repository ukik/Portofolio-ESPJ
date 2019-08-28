<?php

use Illuminate\Database\Eloquent\Model;

class GetLampiranPerubahanBerkas extends Model
{
    protected $table = 'lampiran_perubahan_berkas';

    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $guarded = [
        'id',
        'lampiran_perubahan_id',
        'nama',
        'path',
        'deskripsi',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function perubahan()
    {
        return $this->belongsTo(\GetLampiranPerubahan::class, 'lampiran_perubahan_id');
    }

}
