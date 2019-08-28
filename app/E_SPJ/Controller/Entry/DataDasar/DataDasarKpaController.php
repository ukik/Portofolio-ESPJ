<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use \GetDataDasarKpa as GetKpa;
use \GetDataDasarPegawai as GetPegawai;

use \PostDataDasarKpa as PostKpa;
use \PostDataDasarPegawai as PostPegawai;

use Carbon\Carbon;

class DataDasarKpaController extends Controller
{
    public function index()
    {
      $kpa = GetKpa::with('pegawai')->orderBy('id', 'desc')->paginate(20);

      return Resolver(compact('kpa'));

    }

    public function create()
    {
        return $this->form();
    }

    public function edit($id)
    {
        return $this->form($id);
    }

    public function form($id = null)
    {
        if(!is_null($id)){
            $kpa = GetKpa::find($id);
        }else{
            $kpa = null;
        }
        $listPegawai = GetPegawai::get();

        return Resolver(compact('listPegawai', 'kpa'));
    }

    public function store()
    {
        return $this->save();
    }

    public function update($id)
    {
        return $this->save($id);
    }

    public function save($id = null)
    {
        $this->validate(request(), [
            'pegawai_id' => 'required',
        ]);

        if($id){
            $kpa = PostKpa::find($id);
        }else{
            $kpa = new PostKpa;
        }
        $pegawai = GetPegawai::where('id', request()->input('pegawai_id'))->first();

        $kpa->pegawai_id = request()->input('pegawai_id');
        $kpa->nama = $pegawai->nama_lengkap;
        $kpa->singkatan = $pegawai->singkatan;
        $kpa->nip = $pegawai->nip;
        $kpa->nomor_sk = request()->input('nomor_sk');
        $kpa->tahun = tahun();
        $kpa->aktif = request()->input('aktif') == true ? 1 : 0;

        if(request()->filled('tanggal_sk')){
            $kpa->tanggal_sk = request()->input('tanggal_sk'); 
        }else{
            $kpa->tanggal_sk = null;
        }

        $kpa->save();

        return Resolver('complete');
    }

    public function destroy($id)
    {
        $kpa = PostKpa::find($id);

        if($kpa){
            $kpa->delete();
        }
        
        return Resolver('complete without back');
    }

}
