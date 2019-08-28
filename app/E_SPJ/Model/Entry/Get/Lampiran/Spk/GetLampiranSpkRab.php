<?php

use Illuminate\Database\Eloquent\Model;

class GetLampiranSpkRab extends Model
{
    protected $table = 'lampiran_spk_rab';

    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $guarded = [
        'id',
        'spk_id',
        'subtotal',
        'ppn',
        'total',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function spk()
    {
        return $this->belongsTo(\GetLampiranSpk::class);
    }

    public function detail()
    {
        return $this->hasMany(\GetLampiranSpkRabDetail::class, 'spk_rab_id');
    }

}
