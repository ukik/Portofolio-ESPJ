<?php

use Illuminate\Database\Eloquent\Model;

class GetDataDasarLokasiLuarNegeri extends Model
{
    use \QueryTahun;

    protected $table = 'data_lokasi_ln';
    
    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $casts = [
        'aktif' => 'boolean',
    ];

    protected $guarded = [
        'id',
        'induk_id',
        'tahun',
        'jenis',
        'nama',
        'nama_ibu_kota',
        'singkatan',
        'aktif',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',        
    ];

    public function sub() # original
    {
        return $this->hasMany(\GetDataDasarLokasiLuarNegeri::class, 'induk_id', 'id');
        return $this->hasMany(self::class, 'induk_id');
    }

    public function daerah(){ # versi 2
        return $this->hasMany(self::class, 'induk_id', 'id');
    }    

    public function induk()
    {
        return $this->belongsTo(self::class, 'id', 'induk_id');
    }

    public function nominal()
    {
        return $this->hasMany(\GetStandarPerjadinHarianLuarDetail::class, 'lokasi_ln_id', 'id');
    }
}
