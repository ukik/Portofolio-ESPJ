<?php

use Illuminate\Database\Eloquent\Model;

class GetDataDasarLokasi extends Model
{
    use \QueryTahun;

    protected $table = 'data_lokasi';

    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $casts = [
        'dalam_daerah' => 'boolean',
        'aktif' => 'boolean',
    ];

    protected $guarded = [
        'id',
        'induk_id',
        'tahun',
        'jenis',
        'nama',
        'singkatan',
        'dalam_daerah',
        'aktif',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function sub()
    {
        return $this->hasMany(\GetDataDasarLokasi::class, 'induk_id');
    }

    public function induk()
    {
        return $this->belongsTo(self::class, 'id', 'induk_id');
    }

    public function daerah()
    {
        return $this->hasMany(self::class, 'induk_id');
    }

    public function nominal()
    {
        return $this->hasMany(\GetStandarPerjadinHotelLuarDetail::class, 'lokasi_id', 'id');
    }
}
