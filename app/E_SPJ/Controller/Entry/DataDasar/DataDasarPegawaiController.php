<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use \GetDataDasarBidang as GetBidang;
use \GetDataDasarPegawai as GetPegawai;
use \GetDataDasarPegawaiStandar as GetPegawaiStandar;
use \GetStandarHonor as GetHonor;
use \GetStandarPerjadinHarianDalam as GetHarianDalam;
use \GetStandarPerjadinHarianLuar as GetHarianLuar;
use \GetStandarPerjadinRepresentatif as GetRepresentatif;
use \GetStandarPerjadinHotelDalam as GetHotelDalam;
use \GetStandarPerjadinHotelLuar as GetHotelLuar;

use \PostDataDasarBidang as PostBidang;
use \PostDataDasarPegawai as PostPegawai;
use \PostDataDasarPegawaiStandar as PostPegawaiStandar;
use \PostStandarHonor as PostHonor;
use \PostStandarPerjadinHarianDalam as PostHarianDalam;
use \PostStandarPerjadinHarianLuar as PostHarianLuar;
use \PostStandarPerjadinRepresentatif as PostRepresentatif;
use \PostStandarPerjadinHotelDalam as PostHotelDalam;
use \PostStandarPerjadinHotelLuar as PostHotelLuar;

use Carbon\Carbon;

class DataDasarPegawaiController extends Controller
{
    public function index()
    {
        $listBidang = GetBidang::where('induk_id', null)->with('sub')->get();
        $pegawai = GetPegawai::where(function($query){
            $bidang = request()->input('bidang');
            if($bidang){
                $query->where('bidang_id', $bidang);
            }

            $jenis = request()->input('jenis');
            if($jenis){
                $query->where('jenis', $jenis);
            }

            $keyword = request()->input('keyword');
            if ($keyword) {
                $query->where('nama','like', "%".$keyword."%");
            }

        })->with('bidang')->with('standar')->orderBy('id', 'desc')->paginate(20);

        $pegawai->appends(request()->only('keyword'));

        return Resolver(compact('pegawai', 'listBidang'));
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
        $page = request()->input('page');

        if(!is_null($id)){
            $pegawai = GetPegawai::with('standar')->with('bidang')->find($id);

            if( ! $pegawai->standar && filled($pegawai->golongan) ){
                $defaultHonor = GetHonor::where('golongan', $pegawai->golongan)->value('id');
                $pegawai->standar()->create([
                    'honor_id' => $defaultHonor
                ]);

                $pegawai = $pegawai->fresh(['standar']);
            }

        }else{
            $pegawai = null;
        }

        $listBidang = GetBidang::with('pegawai')->with('sub')->whereNull('induk_id')->tahun()->get();

        $listPerjadinHarianDalamWilayah = GetHarianDalam::tahun()->get();
        $listPerjadinHarianLuarWilayah = GetHarianLuar::tahun()->get();
        $listPerjadinRepresentatif = GetRepresentatif::tahun()->get();
        $listPerjadinHotelDalamWilayah = GetHotelDalam::tahun()->get();
        $listPerjadinHotelLuarWilayah = GetHotelLuar::tahun()->get();
        $listHonor = GetHonor::tahun()->get();

        return Resolver(compact(
            'listBidang',
            'listPerjadinHarianDalamWilayah',
            'listPerjadinHarianLuarWilayah',
            'listPerjadinRepresentatif',
            'listPerjadinHotelDalamWilayah',
            'listPerjadinHotelLuarWilayah',
            'listHonor',
            'pegawai'
        ));
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
            // 'tahun' => 'required',
            'bidang_id' => 'required',
            'nip' => 'required',
            'nama' => 'required',
            // 'gelar_depan' => 'required',
            // 'gelar_belakang' => 'required',
            'singkatan' => 'required',
            'tempat_lahir' => 'required',
            'tanggal_lahir' => 'required',
            'jenis_kelamin' => 'required',
            'jenis' => 'required',
            'instansi' => 'required',
            'pendidikan' => 'required',
            'golongan' => 'required',
            'jabatan' => 'required',
            'npwp' => 'required',
            'email' => 'required',
            // 'telegram' => 'required',
            // 'whatsapp' => 'required',
            'telp' => 'required',
            'alamat' => 'required',
            
            'standar.perjadin_harian_dalam_id' => 'required',
            'standar.perjadin_harian_luar_id' => 'required',
            'standar.perjadin_representatif_id' => 'required',
            'standar.perjadin_hotel_dalam_id' => 'required',
            'standar.perjadin_hotel_luar_id' => 'required',
            'standar.honor_id' => 'required',
        ]);

        if($id){
            $pegawai = PostPegawai::find($id);
        }else{
            $pegawai = new PostPegawai;
        }

        $pegawai->tahun = request()->input('tahun') == null ? null : request()->input('tahun');
        $pegawai->nip = request()->input('nip');
        $pegawai->nama = request()->input('nama');
        $pegawai->singkatan = request()->input('singkatan');
        $pegawai->gelar_depan = request()->input('gelar_depan');
        $pegawai->gelar_belakang = request()->input('gelar_belakang');
        $pegawai->tempat_lahir = request()->input('tempat_lahir');
        $pegawai->tanggal_lahir = request()->input('tanggal_lahir'); 
        $pegawai->jenis_kelamin = request()->input('jenis_kelamin');
        $pegawai->jenis = request()->input('jenis');
        $pegawai->instansi = request()->input('instansi');
        $pegawai->pendidikan = request()->input('pendidikan');
        $pegawai->golongan = request()->input('golongan');
        $pegawai->bidang_id = request()->input('bidang_id');
        $pegawai->jabatan = request()->input('jabatan');
        $pegawai->npwp = request()->input('npwp');
        $pegawai->alamat = request()->input('alamat');

        $pegawai->email = request()->input('email');
        $pegawai->telegram = request()->input('telegram');
        $pegawai->whatsapp = request()->input('whatsapp');
        $pegawai->telp = request()->input('telp');

        $pegawai->save();

        $standar = $pegawai->standar;
        if( ! $standar ){
            $standar = new PostPegawaiStandar;
        }
        $standar->perjadin_harian_dalam_id = request()->input('standar.perjadin_harian_dalam_id');
        $standar->perjadin_harian_luar_id = request()->input('standar.perjadin_harian_luar_id');
        $standar->perjadin_representatif_id = request()->input('standar.perjadin_representatif_id');
        $standar->perjadin_hotel_dalam_id = request()->input('standar.perjadin_hotel_dalam_id');
        $standar->perjadin_hotel_luar_id = request()->input('standar.perjadin_hotel_luar_id');
        $standar->honor_id = request()->input('standar.honor_id');

        $pegawai->standar()->save($standar);

        return Resolver('complete');
    }

    public function destroy($id)
    {
        $pegawai = PostPegawai::find($id);

        if($pegawai){
            $pegawai->delete();
        }

        return Resolver('complete without back');        
    }
}
