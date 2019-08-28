<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use \GetDataDasarPptk as GetPptk;
use \GetDataDasarPegawai as GetPegawai;

use \PostDataDasarPptk as PostPptk;
use \PostDataDasarPegawai as PostPegawai;

use Carbon\Carbon;

class DataDasarPptkController extends Controller
{
    public function index()
    {
      $pptk = GetPptk::with('pegawai')->orderBy('id', 'desc')->paginate(20);

      return Resolver(compact('pptk'));
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
            $pptk = GetPptk::find($id);
        }else{
            $pptk = null;
        }

        $listPegawai = GetPegawai::get();

        return Resolver(compact('listPegawai', 'pptk'));
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
            $pptk = PostPptk::find($id);
        }else{
            $pptk = new PostPptk;
        }
        $pegawai = GetPegawai::where('id', request()->input('pegawai_id'))->first();

        $pptk->pegawai_id = request()->input('pegawai_id');
        $pptk->nama = $pegawai->nama_lengkap;
        $pptk->singkatan = $pegawai->singkatan;
        $pptk->nip = $pegawai->nip;
        $pptk->nomor_sk = request()->input('nomor_sk');
        $pptk->tahun = tahun();
        $pptk->aktif = request()->input('aktif') == true ? 1 : 0;

        if(request()->filled('tanggal_sk')){
            $pptk->tanggal_sk = request()->input('tanggal_sk'); 
        }else{
            $pptk->tanggal_sk = null;
        }

        $pptk->save();

        return Resolver('complete');
    }

    public function destroy($id)
    {
        $pptk = PostPptk::find($id);

        if($pptk){
            $pptk->delete();
        }

        return Resolver('complete without back');
    }

}
