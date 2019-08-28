<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use \GetLampiranSpk as GetSpk;
use \GetSpj as GetSpj;

use \PostLampiranSpk as PostSpk;
use \PostSpj as PostSpj;

use Carbon\Carbon;

class VerifikasiSpkController extends Controller
{
    public function index()
    {
        $spk = GetSpk::where('status', 1)->orderBy('id', 'desc')->paginate(20);
        
        return Resolver(compact('spk'));
    }

    public function review($id)
    {
        $spk = GetSpk::where('id', $id)->first();
        $spk_rab = $spk->rab;

        if($spk_rab) {
            $spk_rab_detail = $spk_rab->detail;
            $hasTanggal = $spk_rab->detail()->orderBy('tanggal', 'DESC')->value('tanggal') !== null;
        }

        return Resolver(compact('spk', 'spk_rab', 'spk_rab_detail', 'hasTanggal'));
    }

    public function approve($id)
    {
        $spk = PostSpk::find($id);
        $spk->status = 2;

        $spk->verified_by = auth()->user() == null ? "unauthenticate" : auth()->user()->username; 

        $spk->save();

        return Resolver('complete');  
    }

    public function reject($id)
    {
        $spk = PostSpk::find($id);
        $spk->status = -1;
        $spk->verified_by = auth()->user() == null ? "unauthenticate" : auth()->user()->username;
        $spk->save();

        return Resolver('complete');  
    }
}
