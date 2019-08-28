<?php

use Illuminate\Database\Eloquent\Model;

class GetSpjRekap extends Model
{
    use \AttributeSpjRekap;

    protected $table = 'spj_rekap';

    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $guarded = [
        'id',
        'spj_id',
        'permohonan_id',
        'permohonan_detail_id',
        'kode_dpa',
        'kode_rekening',
        'penerima',
        'uraian',
        'tanggal',
        'nominal',
        'ppn_persen',
        'ppn_nilai',
        'pph_21_persen',
        'pph_21_nilai',
        'pph_22_persen',
        'pph_22_nilai',
        'pph_23_persen',
        'pph_23_nilai',
        'jumlah',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function spj()
    {
        return $this->belongsTo(\GetSpj::class, 'spj_id');
    }

    public function permohonan()
    {
        return $this->belongsTo(\GetPermohonanGantiUang::class, 'id', 'id');
    }

    public function permohonan_detail()
    {
        return $this->belongsTo(\GetPermohonanGantiUangDetail::class, 'id', 'id');
    }    

    public function berkas()
    {
        return $this->hasMany(\GetBerkas::class,'id','id');
    }
    
}
