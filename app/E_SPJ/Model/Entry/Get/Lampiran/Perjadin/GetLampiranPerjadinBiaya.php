<?php

use Illuminate\Database\Eloquent\Model;

class GetLampiranPerjadinBiaya extends Model
{
    protected $table = 'lampiran_perjadin_biaya';
    
    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $guarded = [
        'id',
        'urut',
        'perjadin_id',
        'perjadin_detail_id',
        'rincian',
        'harga',
        'volume',
        'satuan',
        'jumlah',
        'keterangan',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',       
    ];        

    public function perjadin()
    {
        return $this->belongsTo(\GetLampiranPerjadin::class, 'perjadin_id');
    }

    public function detail()
    {
        return $this->belongsTo(\GetLampiranPerjadinDetail::class, 'perjadin_detail_id');
    }
   
}
