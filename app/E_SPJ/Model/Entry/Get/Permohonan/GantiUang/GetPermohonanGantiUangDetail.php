<?php

use Illuminate\Database\Eloquent\Model;

class GetPermohonanGantiUangDetail extends Model
{
    use \MiscellaneousLabel;

    protected $table = 'permohonan_gu_detail';

    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $guarded = [
        'id',
        'permohonan_id',
        'kode_dpa',
        'kode_rekening',
        'uraian',
        'nominal_diajukan',
        'nominal_disetujui',
        'status',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function permohonan()
    {
        return $this->belongsTo(\GetPermohonanGantiUang::class);
    }

}
