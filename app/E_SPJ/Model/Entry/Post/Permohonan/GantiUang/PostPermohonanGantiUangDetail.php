<?php

use Illuminate\Database\Eloquent\Model;

class PostPermohonanGantiUangDetail extends Model
{

    protected $table = 'permohonan_gu_detail';

    protected $fillable = [
        'id',
        'permohonan_id',
        'kode_dpa',
        'kode_rekening',
        'uraian',
        'nominal_diajukan',
        'nominal_disetujui',
        'status',
        'created_at',
        'updated_at',
    ];

}
