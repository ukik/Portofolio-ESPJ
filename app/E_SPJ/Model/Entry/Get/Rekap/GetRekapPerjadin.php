<?php

use Illuminate\Database\Eloquent\Model;

class GetRekapPerjadin extends Model
{
    use \PaginateOrder;

    protected $table = 'rekap_perjadin';

    public $incrementing = false;

    protected $primaryKey = 'lampiran_perjadin_id';

    protected $guarded = [
        'lampiran_perjadin_id',
        'lampiran_perjadin_jenis_anggaran',
        'lampiran_perjadin_tahun',
        'lampiran_perjadin_kode_dpa',
        'lampiran_perjadin_kode_rekening',
        'lampiran_perjadin_kegiatan',
        'lampiran_perjadin_rincian',
        'lampiran_perjadin_nomor_urut',
        'lampiran_perjadin_nomor_spt',
        'lampiran_perjadin_tanggal',
        'lampiran_perjadin_uraian',
        'lampiran_perjadin_lokasi_id',
        'lampiran_perjadin_lokasi_nama',
        'lampiran_perjadin_tempat_tujuan',
        'lampiran_perjadin_nominal',
        'lampiran_perjadin_tanggal_berangkat',
        'lampiran_perjadin_tanggal_kembali',
        'lampiran_perjadin_lama_perjalanan',
        'lampiran_perjadin_keterangan',
        'lampiran_perjadin_kpa_id',
        'lampiran_perjadin_pptk_id',
        'lampiran_perjadin_bendahara_id',
        'lampiran_perjadin_pimpinan_id',
        'data_pegawai_nama',
    ];

    protected $filter = [
        'lampiran_perjadin_id',
        'lampiran_perjadin_jenis_anggaran',
        'lampiran_perjadin_tahun',
        'lampiran_perjadin_kode_dpa',
        'lampiran_perjadin_kode_rekening',
        'lampiran_perjadin_kegiatan',
        'lampiran_perjadin_rincian',
        'lampiran_perjadin_nomor_urut',
        'lampiran_perjadin_nomor_spt',
        'lampiran_perjadin_tanggal',
        'lampiran_perjadin_uraian',
        'lampiran_perjadin_lokasi_id',
        'lampiran_perjadin_lokasi_nama',
        'lampiran_perjadin_tempat_tujuan',
        'lampiran_perjadin_nominal',
        'lampiran_perjadin_tanggal_berangkat',
        'lampiran_perjadin_tanggal_kembali',
        'lampiran_perjadin_lama_perjalanan',
        'lampiran_perjadin_keterangan',
        'lampiran_perjadin_kpa_id',
        'lampiran_perjadin_pptk_id',
        'lampiran_perjadin_bendahara_id',
        'lampiran_perjadin_pimpinan_id',
        'data_pegawai_nama',
    ];    

    public static function initialize()
    {
      return [
        'lampiran_perjadin_id'                  => '',
        'lampiran_perjadin_jenis_anggaran'      => '',
        'lampiran_perjadin_tahun'               => '',
        'lampiran_perjadin_kode_dpa'            => '',
        'lampiran_perjadin_kode_rekening'       => '',
        'lampiran_perjadin_kegiatan'            => '',
        'lampiran_perjadin_rincian'             => '',
        'lampiran_perjadin_nomor_urut'          => '',
        'lampiran_perjadin_nomor_spt'           => '',
        'lampiran_perjadin_tanggal'             => '',
        'lampiran_perjadin_uraian'              => '',
        'lampiran_perjadin_lokasi_id'           => '',
        'lampiran_perjadin_lokasi_nama'         => '',
        'lampiran_perjadin_tempat_tujuan'       => '',
        'lampiran_perjadin_nominal'             => '',
        'lampiran_perjadin_tanggal_berangkat'   => '',
        'lampiran_perjadin_tanggal_kembali'     => '',
        'lampiran_perjadin_lama_perjalanan'     => '',
        'lampiran_perjadin_keterangan'          => '',
        'lampiran_perjadin_kpa_id'              => '',
        'lampiran_perjadin_pptk_id'             => '',
        'lampiran_perjadin_bendahara_id'        => '',
        'lampiran_perjadin_pimpinan_id'         => '',
        'data_pegawai_nama'                     => '',
      ];
    }    

}
