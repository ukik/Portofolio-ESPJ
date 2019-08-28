<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use \GetLampiranPerjadin as GetPerjadin;
use \PostLampiranPerjadin as PostPerjadin;

use Carbon\Carbon;

class VerifikasiPerjadinController extends Controller
{
    public function index()
    {
        $perjadin = GetPerjadin::where('status', 1)->doesntHave('perubahan_baru')->orderBy('id', 'desc')->paginate(20);

        return Resolver(compact('perjadin'));
    }

    public function perubahan()
    {
        $perjadin = GetPerjadin::where('status', 1)
            ->with('perubahan_baru')
            ->paginate(20);

        return Resolver(compact('perjadin'));
    }

    public function review($id, $from='index')
    {
        $perjadin = GetPerjadin::where('id', $id)->first();
        $perjadin = GetPerjadin::find($id);
        $perjadin_detail = $perjadin->detail()->get();

        return Resolver(compact('perjadin', 'perjadin_detail', 'from'));
    }

    public function approve($id)
    {
        $perjadin = PostPerjadin::find($id);
        $perjadin->status = 2;
        $perjadin->verified_by = auth()->user() == null ? "unauthenticate" : auth()->user()->username; //auth()->user()->username;
        $perjadin->save();

        $from = request()->get('from') ?: 'index';

        return Resolver('complete');  
    }

    public function reject($id)
    {
        $perjadin = PostPerjadin::find($id);
        $perjadin->status = -1;
        $perjadin->verified_by = auth()->user() == null ? "unauthenticate" : auth()->user()->username; //auth()->user()->username;
        $perjadin->save();

        $from = request()->get('from') ?: 'index';

        return Resolver('complete');  
    }
}
