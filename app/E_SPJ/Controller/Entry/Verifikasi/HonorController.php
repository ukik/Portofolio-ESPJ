<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use \GetLampiranHonor as GetHonor;
use \GetLampiranHonorDetail as GetDetail;
use \GetSpj as GetSpj;

use \PostLampiranHonor as PostHonor;
use \PostLampiranHonorDetail as PostDetail;
use \PostSpj as PostSpj;

use Carbon\Carbon;

class VerifikasiHonorController extends Controller
{
    public function index()
    {
        $honor = GetHonor::where('status', 1)->orderBy('id', 'desc')->paginate(20);

        return Resolver(compact('honor'));
    }

    public function review($id)
    {
        $honor = GetHonor::where('id', $id)->first();
        $honor_detail = GetDetail::where('honor_id', $honor->id)->get();

        return Resolver(compact('honor', 'honor_detail'));
    }

    public function approve($id)
    {
        $honor = PostHonor::find($id);
        $honor->status = 2;
        $honor->verified_by = auth()->user() == null ? "unauthenticate" : auth()->user()->username; //auth()->user()->username;
        $honor->save();

        return Resolver('complete');  
    }

    public function reject($id)
    {
        $honor = PostHonor::find($id);
        $honor->status = -1;
        $honor->verified_by = auth()->user() == null ? "unauthenticate" : auth()->user()->username; //auth()->user()->username;
        $honor->save();

        return Resolver('complete');  
    }
}
