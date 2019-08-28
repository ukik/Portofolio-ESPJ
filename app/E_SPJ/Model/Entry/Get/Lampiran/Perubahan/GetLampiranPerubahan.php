<?php

use Illuminate\Database\Eloquent\Model;

class GetLampiranPerubahan extends Model
{
    protected $table = 'lampiran_perubahan';

    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $guarded = [
        'id',
        'lampiran_jenis',
        'lampiran_id_lama',
        'lampiran_id_baru',
        'nomor_lama',
        'nomor_baru',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function lampiran()
    {
        return $this->morphTo();
    }

    public function berkas()
    {
        return $this->hasMany(\GetLampiranPerubahanBerkas::class, 'lampiran_perubahan_id');
    }

}
