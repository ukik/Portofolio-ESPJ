<?php

use Illuminate\Database\Eloquent\Model;

class GetDataDasarKas extends Model
{
    use \QueryTahun;
    use \QueryJenisAnggaran;

    protected $table = 'data_kas';

    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $guarded = [
        'id',
        'jenis_anggaran',
        'tahun',
        'kode_dpa',
        'kode_rekening',
        'jenis',
        'level',
        'bulan',
        'sisa_bulan_lalu',
        'rencana',
        'indikatif',
        'diajukan',
        'disetujui',
        'sisa_bulan_ini',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];


}
