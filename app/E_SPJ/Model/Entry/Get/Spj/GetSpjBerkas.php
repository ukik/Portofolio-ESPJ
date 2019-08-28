<?php

use Illuminate\Database\Eloquent\Model;

class GetSpjBerkas extends Model
{
    use \AttributeSpjBerkas;
    use \MiscellaneousLabel;

    protected $table = 'spj_berkas';

    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $guarded = [
        'id',
        'spj_id',
        'permohonan_id',
        'permohonan_detail_id',
        'lampiran_type',
        'lampiran_id',
        'jenis',
        'nomor',
        'nama',
        'path',
        'deskripsi',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function spj()
    {
        return $this->belongsTo(\GetSpj::class);
    }

}
