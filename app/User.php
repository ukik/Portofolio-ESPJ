<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use Notifiable;
    use HasApiTokens;

    protected $fillable = [
        'nama', 'username', 'level', 
    ];

    protected $guarded = [
        'plain_password'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    public function post(){
        return $this->hasOne(Posts::class, 'id_user', 'id');
    }

    public function user(){
        return $this->hasOne(User::class, 'id', 'id');
    }


    public function getAvatarAttribute()
    {
        $nama = $this->nama;
        $temp = explode(' ', $nama);
        if(count($temp) > 1){
            $first = array_get($temp, 0);
            $second = array_get($temp, 1);

            $first = substr($first, 0, 1);
            $second = substr($second, 0, 1);

            $result = $first . $second;
        }else{
            $result = substr($nama, 0, 2);
        }

        return strtoupper($result);
    }

    public function pegawai()
    {
        return $this->belongsTo(\GetDataDasarPegawai::class);
    }

    public function bidang()
    {
        return $this->belongsTo(\GetDataDasarBidang::class);
    }
}
