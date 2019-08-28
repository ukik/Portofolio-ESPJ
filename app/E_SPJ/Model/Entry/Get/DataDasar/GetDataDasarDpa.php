<?php

use Illuminate\Database\Eloquent\Model;

class GetDataDasarDpa extends Model
{
    use \QueryTahun;
    use \QueryJenisAnggaran;

    protected $table = 'data_dpa';

    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $guarded = [
        'id',
        'jenis_anggaran',
        'tahun',
        'kode_dpa',
        'kode_rekening',
        'kode_surat',
        'jenis',
        'level',
        'nama',
        'pagu',
        'kpa_id',
        'kpa_singkatan',
        'pptk_id',
        'pptk_singkatan',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function kpa()
    {
        return $this->belongsTo(\GetDataDasarKpa::class, 'id', 'id');
    }

    public function pptk()
    {
        return $this->belongsTo(\GetDataDasarPptk::class, 'id', 'id');
    }

    public function kpa1()
    {
        return $this->belongsTo(\GetDataDasarKpa::class, 'kpa_id', 'id');
    }

    public function pptk1()
    {
        return $this->belongsTo(\GetDataDasarPptk::class, 'pptk_id', 'id');
    }    

}

