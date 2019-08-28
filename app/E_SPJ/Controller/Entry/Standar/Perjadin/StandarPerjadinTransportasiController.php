<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use \GetStandarPerjadinTransportasi as GetTransportasi;
use \GetDataDasarLokasi as GetLokasi;

use \PostStandarPerjadinTransportasi as PostTransportasi;
use \PostDataDasarLokasi as PostLokasi;

use Carbon\Carbon;

class StandarPerjadinTransportasiController extends Controller
{
    public function index()
    {
        $transportasi = GetTransportasi::orderBy('id', 'desc')->paginate(20);

        return Resolver(compact('transportasi'));
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
            $transportasi = GetTransportasi::find($id);
        }else{
            $transportasi = null;
        }

        $listLokasi = GetLokasi::whereNull('induk_id')->with('sub')->get();

        return Resolver(compact('listLokasi', 'transportasi'));
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
            'lokasi_berangkat_id' => 'required',
            'lokasi_tujuan_id' => 'required',
        ], [], [
            'jabatan_fungsional_id' => 'Jabatan (Fungsional)'
        ]);

        if($id){
            $transportasi = PostTransportasi::find($id);
        }else{
            $transportasi = new PostTransportasi;
        }
        $transportasi->tahun = tahun();
        $transportasi->golongan = request()->input('golongan');
        $transportasi->lokasi_berangkat_id = request()->input('lokasi_berangkat_id');
        $transportasi->lokasi_tujuan_id = request()->input('lokasi_tujuan_id');
        $transportasi->nominal = numeric(request()->input('nominal'));

        $transportasi->save();

        return Resolver('complete');  
    }

    public function destroy($id)
    {
        $transportasi = PostTransportasi::find($id);

        if($transportasi){
            $transportasi->delete();
        }

        return Resolver('complete without back');  
    }

}
