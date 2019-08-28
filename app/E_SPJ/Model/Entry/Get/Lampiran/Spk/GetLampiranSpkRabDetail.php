<?php

use Illuminate\Database\Eloquent\Model;

class GetLampiranSpkRabDetail extends Model
{
    use \AttributeLampiranSpkRabDetail;

    protected $table = 'lampiran_spk_rab_detail';

    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $guarded = [
        'id',
        'spk_rab_id',
        'tanggal',
        'uraian',
        'volume',
        'satuan',
        'harga',
        'jumlah',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function rab()
    {
        return $this->belongsTo(\GetLampiranSpkRab::class, 'spk_rab_id');
    }

}
