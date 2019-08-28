<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use \GetSpj as GetSpj;
use \GetDataDasarDpa as GetDpa;
use \GetDataDasarPptk as GetPptk;
use \GetDataDasarPpk as GetPpk;
use \GetDataDasarRekanan as GetRekanan;
use \GetDataDasarPimpinan as GetPimpinan;
use \GetDataDasarBendahara as GetBendahara;

use \PostSpj as PostSpj;
use \PostDataDasarDpa as PostDpa;
use \PostDataDasarPptk as PostPptk;
use \PostDataDasarPpk as PostPpk;
use \PostDataDasarRekanan as PostRekanan;
use \PostDataDasarPimpinan as PostPimpinan;
use \PostDataDasarBendahara as PostBendahara;

use \PostPermohonanGantiUang as PostGantiUang;

use Carbon\Carbon;

class VerifikasiSpjController extends Controller
{
    public function index()
    {
        $spj = GetSpj::where('status', 0)->with('permohonan')->orderBy('id', 'desc')->paginate(20); // api

        return Resolver(compact('spj'));  
    }

    public function review($id)
    {
        $spj = GetSpj::with('detail')->find($id);

        return Resolver(compact('spj'));
    }

    public function approve($id)
    {
        $spj = PostSpj::find($id);

        $spj->verified_by = auth()->user()->username; 
        $spj->verified_at = request()->input('verified_at'); 
        $spj->status = 1;
        $spj->save();

        return Resolver('complete');  
    }

    public function reject($id)
    {
        $spj = PostSpj::find($id);
        $spj->verified_by = auth()->user()->username; 
        $spj->verified_at = request()->input('verified_at'); 
        $spj->status = -2;

        $spj->save();

        return Resolver('complete');  
    }
}
