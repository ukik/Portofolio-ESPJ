<?php

use Illuminate\Database\Eloquent\Model;

class GetPengaturan extends Model
{
    protected $table = 'pengaturan';

    protected $primaryKey = 'key';
    public $incrementing = false;

    public $timestamps = false;

    protected $guarded = [
        'key',
        'value',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

}
