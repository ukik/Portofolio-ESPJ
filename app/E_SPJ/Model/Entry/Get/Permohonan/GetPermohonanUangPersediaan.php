<?php

use Illuminate\Database\Eloquent\Model;

class GetPermohonanUangPersediaan extends Model
{
    use \AttributePermohonanUangPersediaan;
    use \MiscellaneousLabel;

    protected $table = 'permohonan_up';

    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $guarded = [
        'id',
        'jenis_anggaran',
        'tahun',
        'uraian',
        'tanggal',
        'nominal_sebelum',
        'nominal_pemakaian',
        'nominal_persediaan',
        'nominal_saldo',
        'created_by',
        'updated_by',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

}
