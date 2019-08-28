<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use \GetDataDasarRekanan as GetRekanan;
use \PostDataDasarRekanan as PostRekanan;

use Carbon\Carbon;

class DataDasarRekananController extends Controller
{
    public function index()
    {
        $rekanan = GetRekanan::where(function($query){
            $keyword = request()->input('keyword');
            if ($keyword) {
                $query->where('nama_pimpinan','like',"%".$keyword."%")
                ->orWhere('nama_perusahaan','like',"%".$keyword."%");
            }
        })->orderBy('id', 'desc')->paginate(20);

        return Resolver(compact('rekanan'));
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
            $rekanan = GetRekanan::find($id);
        }else{
            $rekanan = null;
        }

        return Resolver(compact('rekanan'));
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
            'nama_perusahaan' => 'required',
            'nama_pimpinan' => 'required',
            'npwp' => 'required',
            'telp' => 'required',
        ]);

        if($id){
            $rekanan = PostRekanan::find($id);
        }else{
            $rekanan = new PostRekanan;
        }

        $rekanan->nama_perusahaan = request()->input('nama_perusahaan');
        $rekanan->nama_pimpinan = request()->input('nama_pimpinan');
        $rekanan->npwp = request()->input('npwp');
        $rekanan->telp = request()->input('telp');
        $rekanan->fax = request()->input('fax');
        $rekanan->email = request()->input('email');
        $rekanan->website = request()->input('website');
        $rekanan->alamat = request()->input('alamat');

        $rekanan->save();

        return Resolver('complete');

    }

    public function destroy($id)
    {
        $rekanan = PostRekanan::find($id);

        if($rekanan){
            $rekanan->delete();
        }

        return Resolver('complete without back');        
    }
}
