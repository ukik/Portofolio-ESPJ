<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use \GetDataDasarPimpinan as GetPimpinan;
use \GetDataDasarPegawai as GetPegawai;

use \PostDataDasarPimpinan as PostPimpinan;
use \PostDataDasarPegawai as PostPegawai;

use Carbon\Carbon;

class DataDasarPimpinanController extends Controller
{
    public function index()
    {
        $pimpinan = GetPimpinan::with('pegawai')->orderBy('id', 'desc')->paginate(20);

        return Resolver(compact('pimpinan'));       
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
            $pimpinan = GetPimpinan::find($id);
        }else{
            $pimpinan = null;
        }

        $listPegawai = GetPegawai::get();

        return Resolver(compact('listPegawai', 'pimpinan'));
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
            $pimpinan = PostPimpinan::find($id);
        }else{
            $pimpinan = new PostPimpinan;
        }

        $pegawai = GetPegawai::where('id', request()->input('pegawai_id'))->first();

        $now = Carbon::now();

        $pimpinan->pegawai_id = request()->input('pegawai_id');
        $pimpinan->nama = $pegawai->nama_lengkap;
        $pimpinan->singkatan = $pegawai->singkatan;
        $pimpinan->nip = $pegawai->nip;
        $pimpinan->nomor_sk = request()->input('nomor_sk');
        $pimpinan->tanggal_sk = request()->input('tanggal_sk'); 
        $pimpinan->tahun = $now->year ;
        $pimpinan->aktif = request()->input('aktif') == true ? 1 : 0; 

        $pimpinan->save();

        return Resolver('complete');
    }

    public function destroy($id)
    {
        $pimpinan = PostPimpinan::find($id);

        if($pimpinan){
            $pimpinan->delete();
        }

        return Resolver('complete without back');        
    }

}
