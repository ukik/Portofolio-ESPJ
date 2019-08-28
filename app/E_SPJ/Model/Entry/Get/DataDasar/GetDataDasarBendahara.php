<?php

use Illuminate\Database\Eloquent\Model;

class GetDataDasarBendahara extends Model
{
    use \QueryAktif;
    use \QueryTahun;
    use \AttributeDataDasarBendahara;

    protected $table = 'data_bendahara';

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
        'bidang',
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
        return $this->belongsTo(\GetDataDasarPegawai::class);
    }

}
