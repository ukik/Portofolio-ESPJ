<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use \GetDataDasarPpk as GetPpk;
use \GetDataDasarPegawai as GetPegawai;

use \PostDataDasarPpk as PostPpk;
use \PostDataDasarPegawai as PostPegawai;

use Carbon\Carbon;

class DataDasarPpkController extends Controller
{
    public function index()
    {
        $ppk = GetPpk::with('pegawai')->orderBy('id', 'desc')->paginate(20);

        return Resolver(compact('ppk'));
    }

    public function form($id = null)
    {
        if (!is_null($id)) {
            if ($id) {
                $ppk = GetPpk::find($id);
            }
        }else {
            $ppk = null;
        }

        $listPegawai = GetPegawai::get();

        return Resolver(compact('listPegawai', 'ppk'));
    }

    public function simpan($id = null)
    {
        $this->validate(request(),[
            'pegawai_id' => 'required',
        ]);

        if ($id) {
            $ppk = PostPpk::find($id);
        }else {
            $ppk = new PostPpk;
        }

        $pegawai = GetPegawai::where('id', request()->input('pegawai_id'))->first();

        $ppk->pegawai_id = request()->input('pegawai_id');
        $ppk->nama = $pegawai->nama_lengkap;
        $ppk->singkatan = $pegawai->singkatan;
        $ppk->nip = $pegawai->nip;
        $ppk->nomor_sk = request()->input('nomor_sk');
        $ppk->tahun = tahun();
        $ppk->aktif = request()->input('aktif') == true ? 1 : 0;

        if (request()->filled('tanggal_sk')) {
            $ppk->tanggal_sk = request()->input('tanggal_sk'); 
        }else {
            $ppk->tanggal_sk = null;
        }

        $ppk->save();

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
        return $this->simpan();
    }

    public function update($id)
    {
        return $this->simpan($id);
    }

    public function destroy($id)
    {
        $ppk = PostPpk::find($id);

        if($ppk){
            $ppk->delete();
        }

        return Resolver('complete without back');      
    }


}
