<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use \GetPermohonanGantiUang as GetGantiUang;
use \GetPermohonanUangPersediaan as GetUangPersediaan;
use \GetDataDasarDpa as GetDpa;
use \GetDataDasarKas as GetKas;
use \GetDataDasarBendahara as GetBendahara;
use \GetDataDasarRekanan as GetRekanan;
use \GetDataDasarPimpinan as GetPimpinan;

use \PostPermohonanGantiUang as PostGantiUang;
use \PostPermohonanUangPersediaan as PostUangPersediaan;
use \PostDataDasarDpa as PostDpa;
use \PostDataDasarKas as PostKas;
use \PostDataDasarBendahara as PostBendahara;
use \PostDataDasarRekanan as PostRekanan;
use \PostDataDasarPimpinan as PostPimpinan;

use Carbon\Carbon;

class PermohonanUpController extends Controller
{
    public function index()
    {
        $permohonan = GetUangPersediaan::orderBy('id', 'desc')->paginate(20);

        return Resolver(compact('permohonan'));
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
        $tahun = tahun();
        if(!is_null($id)){
            $permohonan = GetUangPersediaan::find($id);
        }else{
            $permohonan = null;
        }
        return Resolver(compact(
            'permohonan'
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
            'tanggal' => 'required',
            'nominal_sebelum' => 'required',
            'nominal_pemakaian' => 'required',
            'nominal_persediaan' => 'required',
        ]);

        $tahun = tahun();
        $jenis_anggaran = jenis_anggaran();

        if($id){
            $permohonan = PostUangPersediaan::find($id);
            $nominal_sebelum = $permohonan->nominal_sebelum;
        }else{
            $permohonan = new PostUangPersediaan;
            $nominal_sebelum = PostUangPersediaan::latest('id')->value('nominal_saldo') ?: 0;
        }

        $nominal_sebelum = numeric(request()->input('nominal_persediaan'));
        $nominal_persediaan = numeric(request()->input('nominal_persediaan'));
        $nominal_pemakaian = numeric(request()->input('nominal_pemakaian'));

        $permohonan->tahun = $tahun;
        $permohonan->jenis_anggaran = $jenis_anggaran;
        $permohonan->tanggal = request()->input('tanggal'); 
        $permohonan->uraian = request()->input('uraian');
        $permohonan->nominal_sebelum = $nominal_sebelum;
        $permohonan->nominal_persediaan = $nominal_persediaan;
        $permohonan->nominal_pemakaian = $nominal_pemakaian;

        $permohonan->nominal_saldo = $nominal_sebelum + $nominal_persediaan - $nominal_pemakaian;
        $permohonan->save();

        if($id){
            $permohonan->updated_by = auth()->user()->username;
        }else{
            $permohonan->created_by = auth()->user()->username;
            $permohonan->updated_by = auth()->user()->username;
        }

        $permohonan->save();

        return Resolver('complete');  
    }

    public function destroy($id)
    {
        $permohonan = PostUangPersediaan::find($id);

        if($permohonan){
            $permohonan->delete();
        }

        return Resolver('complete without back');  
    }
}
