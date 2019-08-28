<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use \GetPermohonanGantiUang as GetGantiUang;
use \GetSpj as GetSpj;
use \GetDataDasarDpa as GetDpa;
use \GetDataDasarPptk as GetPptk;
use \GetDataDasarPpk as GetPpk;
use \GetDataDasarRekanan as GetRekanan;
use \GetDataDasarPimpinan as GetPimpinan;
use \GetDataDasarBendahara as GetBendahara;

use \PostPermohonanGantiUang as PostGantiUang;
use \PostSpj as PostSpj;
use \PostDataDasarDpa as PostDpa;
use \PostDataDasarPptk as PostPptk;
use \PostDataDasarPpk as PostPpk;
use \PostDataDasarRekanan as PostRekanan;
use \PostDataDasarPimpinan as PostPimpinan;
use \PostDataDasarBendahara as PostBendahara;

use Carbon\Carbon;

class VerifikasiGuController extends Controller
{
    public function index()
    {
        // logikanya hanya yang diajukan yang tampil
        // status untuk GU berbeda dengan lainnya, untuk diajukan = 0
        $permohonan = GetGantiUang::where('status', 0)->orderBy('id', 'desc')->paginate(20);

        return Resolver(compact('permohonan'));
    }

    public function review($id)
    {
        $permohonan = GetGantiUang::with('detail')->find($id);

        $kegiatan = GetDpa::where('tahun', $permohonan->tahun)
                    ->where('jenis_anggaran', $permohonan->jenis_anggaran)
                    ->where('kode_dpa', $permohonan->kode_dpa)->first();

        return Resolver(compact('permohonan', 'kegiatan'));
    }

    public function update($id = null)
    {
        $permohonan = PostGantiUang::with('detail')->find($id);

        $this->validate(request(), [
            'nominal_disetujui' => 'required|integer|min:0|max:'. (int)$permohonan->nominal_diajukan .'',
        ]);

        $permohonan->update([
            'nominal_disetujui' => request()->input('nominal_disetujui')
        ]);

        \PostSpj::where('permohonan_id', $id)->update([
            'updated_by' => auth()->user()->username
        ]);

        $back = false;

        return Resolver(compact('permohonan', 'back'));  
    }

    public function approve($id)
    {

        $this->validate(request(), [
            'verified_at' => 'required',
        ]);   

        $permohonan = PostGantiUang::find($id);

        $permohonan->verified_by = auth()->user()->username;
        $permohonan->verified_at = request()->input('verified_at'); 
        $permohonan->nominal_disetujui = request()->input('nominal_disetujui');
        $permohonan->status = 1;
        $permohonan->save();

        $spj = \PostSpj::where('permohonan_id', $id)->first();

        $spj->created_by = auth()->user()->username;
        $spj->tanggal = $permohonan->tanggal;
        $spj->jenis_anggaran = $permohonan->jenis_anggaran;
        $spj->tahun = $permohonan->tahun;
        $spj->kode_dpa = $permohonan->kode_dpa;
        $spj->kegiatan = $permohonan->kegiatan;

        $spj->nominal_diajukan = $permohonan->nominal_diajukan;
        $spj->nominal_disetujui = $permohonan->nominal_disetujui;
        $spj->nominal_sisa = $spj->nominal_disetujui - $spj->nominal_spj;

        $spj->save();

        $permohonan->spj()->save($spj);

        return Resolver('complete');  
    }

    public function reject($id)
    {
        $permohonan = PostGantiUang::find($id);
        
        foreach($permohonan->detail as $detail){
            $detail->nominal_disetujui = 0;
            $detail->status = -1;
            $detail->save();
        }

        $permohonan->verified_by = auth()->user()->username; 
        $permohonan->verified_at = request()->input('verified_at'); 
        $permohonan->nominal_disetujui = $permohonan->detail()->sum('nominal_disetujui');
        $permohonan->status = -1;
        $permohonan->save();

        return Resolver('complete');  
    }
}
