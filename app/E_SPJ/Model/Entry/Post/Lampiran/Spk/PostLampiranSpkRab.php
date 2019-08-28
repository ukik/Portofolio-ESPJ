<?php

use Illuminate\Database\Eloquent\Model;

class PostLampiranSpkRab extends Model
{
    protected $table = 'lampiran_spk_rab';

    protected $fillable = [
        'id',
        'spk_id',
        'subtotal',
        'ppn',
        'total',
        'created_at',
        'updated_at',
    ];

    public function detail()
    {
        return $this->hasMany(\GetLampiranSpkRabDetail::class, 'spk_rab_id', 'spk_id');
    }    
    
}
