<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use \GetDataDasarBendahara as GetBendahara;
use \GetDataDasarPegawai as GetPegawai;

use \PostDataDasarBendahara as PostBendahara;
use \PostDataDasarPegawai as PostPegawia;

use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class DataDasarBendaharaController extends Controller
{
    public function index()
    {
        $bendahara = GetBendahara::with('pegawai')
            ->orderBy('id', 'desc')
            ->paginate(20);

        return Resolver(compact('bendahara'));
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
            $bendahara = GetBendahara::find($id);

        }else{
            $bendahara = null;
        }
        $listPegawai = GetPegawai::get();

        return Resolver(compact('listPegawai', 'bendahara'));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'pegawai_id' => 'required',
            'nomor_sk' => 'required',
            'tanggal_sk' => 'required|date|date_format:Y-m-d',
        ]);

        if ($validator->fails()) {
            $message = $validator->messages()->first();
            $status = "validation";
            return Resolver(compact('message','status'));
        }

        $bendahara = new PostBendahara;
 
        $pegawai = GetPegawai::find(request()->input('pegawai_id'));

        $bendahara->pegawai_id = request()->input('pegawai_id');
        $bendahara->nama = $pegawai->nama_lengkap;
        $bendahara->singkatan = $pegawai->singkatan;
        $bendahara->nip = $pegawai->nip;
        $bendahara->nomor_sk = request()->input('nomor_sk');
        $bendahara->tanggal_sk = request()->input('tanggal_sk');
        $bendahara->aktif = request()->input('aktif') == true ? 1 : 0;

        $bendahara->save();

        return Resolver('complete');
    }

    public function update(Request $request, $id)
    {
        return $this->save($request, $id);
    }

    public function save($request, $id = null)
    {
        $this->validate(request(), [
            'pegawai_id' => 'required'
        ]);

        if($id){
            $bendahara = PostBendahara::find($id);
        }else{
            $bendahara = new PostBendahara;
        }
        $pegawai = GetPegawai::find(request()->input('pegawai_id'));

        $bendahara->pegawai_id = request()->input('pegawai_id');
        $bendahara->nama = $pegawai->nama_lengkap;
        $bendahara->singkatan = $pegawai->singkatan;
        $bendahara->nip = $pegawai->nip;
        $bendahara->nomor_sk = request()->input('nomor_sk');
        $bendahara->tanggal_sk = request()->input('tanggal_sk'); 
        $bendahara->aktif = request()->input('aktif') === true ? 1 : 0;

        $bendahara->save();

        return Resolver('complete');
    }

    public function destroy($id)
    {
        $bendahara = PostBendahara::find($id);

        if($bendahara){
            $bendahara->delete();
        }

        return Resolver('complete without back');        
    }

}
