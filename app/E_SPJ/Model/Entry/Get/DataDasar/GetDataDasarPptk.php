<?php

use Illuminate\Database\Eloquent\Model;

class GetDataDasarPptk extends Model
{
    use \AttributeDataDasarPptk;

    protected $table = 'data_pptk';

    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $casts = [
        'aktif' => 'boolean',
    ];

    protected $guarded = [
        'id',
        'tahun',
        'pegawai_id',
        'nama',
        'singkatan',
        'nip',
        'nomor_sk',
        'tanggal_sk',
        'aktif',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function pegawai()
    {
        return $this->belongsTo(\GetDataDasarPegawai::class,'pegawai_id','id');
    }

    public function dpa()
    {
        return $this->hasMany(\GetDataDasarDpa::class,'id','id');
    }
     
}
