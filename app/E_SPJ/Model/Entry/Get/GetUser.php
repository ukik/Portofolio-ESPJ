<?php

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;

class GetUser extends Authenticatable
{
    use Notifiable;
    use HasApiTokens;
    
    use \AttributeUser;

    protected $table = 'users';

    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $guarded = [
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
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function pegawai()
    {
        return $this->belongsTo(\GetDataDasarPegawai::class, 'pegawai_id', 'id');
    }

    public function bidang()
    {
        return $this->hasOne(\GetDataDasarBidang::class, 'id', 'bidang_id');
        return $this->belongsTo(\GetDataDasarBidang::class, 'bidang_id', 'id');
    }
}
