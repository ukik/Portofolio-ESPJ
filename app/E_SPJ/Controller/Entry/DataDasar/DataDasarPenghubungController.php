<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use \GetDataDasarPenghubung as GetPenghubung;
use \GetDataDasarPegawai as GetPegawai;

use \PostDataDasarPenghubung as PostPenghubung;
use \PostDataDasarPegawai as PostPegawai;

use Carbon\Carbon;

class DataDasarPenghubungController extends Controller
{
    public function index()
    {
        $penghubung = GetPenghubung::orderBy('id', 'desc')->paginate(20);

        return Resolver(compact('penghubung'));
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
            $penghubung = GetPenghubung::find($id);
        }else{
            $penghubung = null;
        }
        $listPegawai = GetPegawai::get();

        return Resolver(compact('listPegawai', 'penghubung'));
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
            $penghubung = PostPenghubung::find($id);
        }else{
            $penghubung = new PostPenghubung;
        }

        $pegawai = GetPegawai::find(request()->input('pegawai_id'));

        $penghubung->tahun = tahun();
        $penghubung->pegawai_id = request()->input('pegawai_id');
        $penghubung->nama = $pegawai->nama_lengkap;
        $penghubung->singkatan = $pegawai->singkatan;
        $penghubung->nip = $pegawai->nip;
        $penghubung->bidang = data_get($pegawai->bidang, 'nama');
        $penghubung->nomor_sk = request()->input('nomor_sk');
        if(request()->filled('tanggal_sk')){
            $penghubung->tanggal_sk = request()->input('tanggal_sk'); 
        }
        $penghubung->aktif = request()->input('aktif') == true ? 1 : 0; 

        $penghubung->save();

        return Resolver('complete');
    }

    public function destroy($id)
    {
        $penghubung = PostPenghubung::find($id);

        if($penghubung){
            $penghubung->delete();
        }

        return Resolver('complete without back');        
    }

}
