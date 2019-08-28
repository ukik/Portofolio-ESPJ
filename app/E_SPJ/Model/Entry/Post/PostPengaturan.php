<?php

use Illuminate\Database\Eloquent\Model;

class PostPengaturan extends Model
{
    protected $table = 'pengaturan';

    protected $primaryKey = 'key';

    protected $fillable = [
        'key',
        'value',
        'created_at',
        'updated_at',
    ];

}
