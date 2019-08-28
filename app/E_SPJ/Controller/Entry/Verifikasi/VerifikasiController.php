<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use \GetPermohonanGantiUang as GetGantiUang;
use \GetLampiranHonor as GetHonor;
use \GetLampiranPerjadin as GetPerjadin;
use \GetLampiranSpk as GetSpk;
use \GetSpj as GetSpj;

use \PostPermohonanGantiUang as PostGantiUang;
use \PostLampiranHonor as PostHonor;
use \PostLampiranPerjadin as PostPerjadin;
use \PostLampiranSpk as PostSpk;
use \PostSpj as PostSpj;

use Carbon\Carbon;

class VerifikasiController extends Controller
{
    public function index()
    {
        $gu = GetGantiUang::where('status', 0)->count();
        $spj = GetSpj::where('status', 0)->count();

        $honor = GetHonor::where('status', 1)->doesntHave('perubahan_baru')->count();
        $perjadin = GetPerjadin::where('status', 1)->doesntHave('perubahan_baru')->count();
        $spk = GetSpk::where('status', 1)->doesntHave('perubahan_baru')->count();

        $perubahan_honor = GetHonor::where('status', 1)->whereHas('perubahan_baru1')->count();
        $perubahan_perjadin = GetPerjadin::where('status', 1)->whereHas('perubahan_baru1')->count();
        $perubahan_spk = GetSpk::where('status', 1)->whereHas('perubahan_baru1')->count();

        return Resolver(compact(
            'gu',
            'spj',
            'honor',
            'perjadin',
            'spk',
            'perubahan_honor',
            'perubahan_perjadin',
            'perubahan_spk'
        ));
    }
}
