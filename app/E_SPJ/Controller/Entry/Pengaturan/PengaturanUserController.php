<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;

use \GetUser as GetUser;
use \GetDataDasarPegawai as GetPegawai;
use \GetDataDasarBidang as GetBidang;

use \PostUser as PostUser;
use \PostDataDasarPegawai as PostPegawai;
use \PostDataDasarBidang as PostBidang;

class PengaturanUserController extends Controller
{
    public function index()
    {
        $user = GetUser::with('pegawai')->with('bidang')->orderBy('id', 'desc')->paginate(50);

        $listPegawai = GetPegawai::orderBy('id', 'desc')->get();

        return Resolver(compact('user', 'listPegawai'));
    }

    public function form($id = null)
    {
        if (!is_null($id)) {
            if ($id) {
                $user = GetUser::find($id);
            }
        }else {
            $user = null;
        }

        $listPegawai = GetPegawai::get();
        $listBidang = GetBidang::where('induk_id', null)->with('sub')->get();

        if(old('pegawai_id')){
            $pegawai = GetPegawai::find(old('pegawai_id'));
            $bidang = data_get($pegawai, 'bidang.nama');
        }

        return Resolver(compact('listPegawai', 'listBidang', 'bidang', 'user'));
    }

    public function save($id = null)
    {

        $this->validate(request(), [
            'nama' => 'required',
            'level' => 'required',
            'username'  =>'required|unique:users,username' . ($id ? (',' . $id) : ''),
            'password'  =>'confirmed' . ( ! $id ? '|required' : '')

        ]);

        if ($id) {
            $user = PostUser::find($id);
        }else {
            $user = new PostUser;
        }
        $user->nama     = request()->input('nama');
        $user->username = request()->input('username');
        $user->level    = request()->input('level');

        $pegawai = GetPegawai::find(old('pegawai_id'));

        $user->pegawai_id = request()->input('pegawai_id');
        $user->bidang_id = request()->input('bidang_id'); 

        if (request()->input('password_lama')) {
            if (request()->input('password')) {
                $user->password = bcrypt(request()->input('password'));
                $user->plain_password = request()->input('password');
            }
        } 

        if (request()->input('password')) {
            $user->password = bcrypt(request()->input('password'));
            $user->plain_password = request()->input('password');
        }

        $user->save();

        return Resolver('complete');  
    }

    public function create()
    {
        return $this->form();
    }

    public function edit($id)
    {
        return $this->form($id);
    }

    public function store()
    {
        return $this->save();
    }

    public function update($id)
    {
        return $this->save($id);
    }

    # dipake siapa?
	/*
    public function postChangePassword()
    {
        $user->password = bcrypt(request()->input('password'));
        $user->save();
        return Resolver('complete');  
    }

    public function destroy($id)
    {
        $user = PostUser::find($id);
        $user->delete();

        return Resolver('complete without back');  
    }    
	*/
}
