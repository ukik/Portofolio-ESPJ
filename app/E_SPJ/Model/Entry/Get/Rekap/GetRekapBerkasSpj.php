<?php

use Illuminate\Database\Eloquent\Model;

class GetRekapBerkasSpj extends Model
{
    use \PaginateOrder;

    protected $table = 'rekap_berkas_spj';

    public $incrementing = false;

    protected $primaryKey = 'spj_id';

    protected $guarded = [
        'permohonan_id',
        'permohonan_jenis_anggaran',
        'permohonan_tahun',
        'permohonan_kode_dpa',
        'permohonan_kegiatan',
        'permohonan_nomor_urut',
        'permohonan_nomor_permohonan',
        'permohonan_tanggal',
        'permohonan_nominal_diajukan',
        'permohonan_nominal_disetujui',
        'spj_id',
        'spj_jenis_anggaran',
        'spj_tahun',
        'spj_permohonan_jenis',
        'spj_permohonan_id',
        'spj_kode_dpa',
        'spj_kegiatan',
        'spj_tanggal',
        'spj_nominal_diajukan',
        'spj_nominal_disetujui',
        'spj_nominal_spj',
        'spj_nominal_sisa',
    ];

    protected $filter = [
        'permohonan_id',
        'permohonan_jenis_anggaran',
        'permohonan_tahun',
        'permohonan_kode_dpa',
        'permohonan_kegiatan',
        'permohonan_nomor_urut',
        'permohonan_nomor_permohonan',
        'permohonan_tanggal',
        'permohonan_nominal_diajukan',
        'permohonan_nominal_disetujui',
        'spj_id',
        'spj_jenis_anggaran',
        'spj_tahun',
        'spj_permohonan_jenis',
        'spj_permohonan_id',
        'spj_kode_dpa',
        'spj_kegiatan',
        'spj_tanggal',
        'spj_nominal_diajukan',
        'spj_nominal_disetujui',
        'spj_nominal_spj',
        'spj_nominal_sisa',
    ];    

    public static function initialize()
    {
      return [
        'permohonan_id'                 => '',
        'permohonan_jenis_anggaran'     => '',
        'permohonan_tahun'              => '',
        'permohonan_kode_dpa'           => '',
        'permohonan_kegiatan'           => '',
        'permohonan_nomor_urut'         => '',
        'permohonan_nomor_permohonan'   => '',
        'permohonan_tanggal'            => '',
        'permohonan_nominal_diajukan'   => '',
        'permohonan_nominal_disetujui'  => '',
        'spj_id'                        => '',
        'spj_jenis_anggaran'            => '',
        'spj_tahun'                     => '',
        'spj_permohonan_jenis'          => '',
        'spj_permohonan_id'             => '',
        'spj_kode_dpa'                  => '',
        'spj_kegiatan'                  => '',
        'spj_tanggal'                   => '',
        'spj_nominal_diajukan'          => '',
        'spj_nominal_disetujui'         => '',
        'spj_nominal_spj'               => '',
        'spj_nominal_sisa'              => '',
      ];
    }    

}
