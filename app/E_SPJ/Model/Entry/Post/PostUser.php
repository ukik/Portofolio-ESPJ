<?php

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;

class PostUser extends Authenticatable
{
    use Notifiable;
    use HasApiTokens;

    protected $table = 'users';

    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'nama',
        'username',
        'password',
        'level',
        'pegawai_id',
        'bidang_id',
        'remember_token',
        'plain_password',
        'signiture',
        'tahun_aktif',
        'anggaran_aktif',
        'created_at',
        'updated_at',
    ];
    
}
