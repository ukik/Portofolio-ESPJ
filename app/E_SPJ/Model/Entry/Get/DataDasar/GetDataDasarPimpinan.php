<?php

use Illuminate\Database\Eloquent\Model;

class GetDataDasarPimpinan extends Model
{
    use \QueryTahun;
    use \QueryAktif;
    use \AttributeDataDasarPimpinan;

    protected $table = 'data_pimpinan';

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
        'bidang',
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

}
