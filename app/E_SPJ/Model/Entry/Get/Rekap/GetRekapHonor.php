<?php

use Illuminate\Database\Eloquent\Model;

class GetRekapHonor extends Model
{
    use \PaginateOrder;
   
    protected $table = 'rekap_honor';

    public $incrementing = false;

    protected $primaryKey = 'lampiran_honor_id';

    protected $guarded = [
        'lampiran_honor_id',
        'lampiran_honor_jenis_anggaran',
        'lampiran_honor_tahun',
        'lampiran_honor_bulan',
        'lampiran_honor_jenis',
        'lampiran_honor_uraian',
        'lampiran_honor_kode_dpa',
        'lampiran_honor_kode_rekening',
        'lampiran_honor_kegiatan',
        'lampiran_honor_rincian',
        'lampiran_honor_tanggal',
        'lampiran_honor_subtotal',
        'lampiran_honor_pph_21',
        'lampiran_honor_pph_22',
        'lampiran_honor_pph_23',
        'lampiran_honor_total',
        'lampiran_honor_kpa_id',
        'lampiran_honor_pptk_id',
        'lampiran_honor_bendahara_id',
        'lampiran_honor_pimpinan_id',
    ];

    protected $filter = [
        'lampiran_honor_id',
        'lampiran_honor_jenis_anggaran',
        'lampiran_honor_tahun',
        'lampiran_honor_bulan',
        'lampiran_honor_jenis',
        'lampiran_honor_uraian',
        'lampiran_honor_kode_dpa',
        'lampiran_honor_kode_rekening',
        'lampiran_honor_kegiatan',
        'lampiran_honor_rincian',
        'lampiran_honor_tanggal',
        'lampiran_honor_subtotal',
        'lampiran_honor_pph_21',
        'lampiran_honor_pph_22',
        'lampiran_honor_pph_23',
        'lampiran_honor_total',
        'lampiran_honor_kpa_id',
        'lampiran_honor_pptk_id',
        'lampiran_honor_bendahara_id',
        'lampiran_honor_pimpinan_id',
    ];    

    public static function initialize()
    {
      return [
        'lampiran_honor_id'                 => '',
        'lampiran_honor_jenis_anggaran'     => '',
        'lampiran_honor_tahun'              => '',
        'lampiran_honor_bulan'              => '',
        'lampiran_honor_jenis'              => '',
        'lampiran_honor_uraian'             => '',
        'lampiran_honor_kode_dpa'           => '',
        'lampiran_honor_kode_rekening'      => '',
        'lampiran_honor_kegiatan'           => '',
        'lampiran_honor_rincian'            => '',
        'lampiran_honor_tanggal'            => '',
        'lampiran_honor_subtotal'           => '',
        'lampiran_honor_pph_21'             => '',
        'lampiran_honor_pph_22'             => '',
        'lampiran_honor_pph_23'             => '',
        'lampiran_honor_total'              => '',
        'lampiran_honor_kpa_id'             => '',
        'lampiran_honor_pptk_id'            => '',
        'lampiran_honor_bendahara_id'       => '',
        'lampiran_honor_pimpinan_id'        => '',
      ];
    }    

}
