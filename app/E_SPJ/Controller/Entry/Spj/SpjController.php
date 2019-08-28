<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use \GetSpj as GetSpj;
use \GetDataDasarDpa as GetDpa;
use \GetDataDasarPptk as GetPptk;
use \GetDataDasarRekanan as GetRekanan;
use \GetDataDasarPimpinan as GetPimpinan;
use \GetDataDasarBendahara as GetBendahara;

use \PostSpj as PostSpj;
use \PostDataDasarDpa as PostDpa;
use \PostDataDasarPptk as PostPptk;
use \PostDataDasarRekanan as PostRekanan;
use \PostDataDasarPimpinan as PostPimpinan;
use \PostDataDasarBendahara as PostBendahara;

class SpjController extends Controller
{
    public function index()
    {
        $spj = GetSpj::with('permohonan')->orderBy('id', 'desc')->paginate(20);

        return Resolver(compact('spj')); 
    }

    public function show($id)
    {
        $spj = GetSpj::find($id);

        return Resolver(compact('spj'));
    }

    public function submit($id)
    {
        $spj = PostSpj::find($id);
        $spj->tanggal = request()->input('tanggal') ?: date('Y-m-d');
        $spj->status = 0;
        $spj->save();

        return Resolver('complete without back');  
    }

    public function upload($id)
    {
        $spj = GetSpj::find($id);

        return Resolver(compact('spj'));
    }

    public function uploadForm($spj_id, $berkas_id = null)
    {
        $spj = GetSpj::find($spj_id);

        if(!is_null($berkas_id)){
            $berkas = $spj->berkas()->find($berkas_id);
        }else{
            $berkas = null;
        }

        return Resolver(compact('spj', 'berkas'));
    }

    public function uploadSave($spj_id, $berkas_id = null)
    {
        $this->validate(request(), [
            'file' => 'required|file'
        ]);

        $spj = PostSpj::find($spj_id);

        if(is_null($berkas_id)){
            $spj->berkas()->truncate();
            $berkas = $spj->berkas()->create([]);
        }else{
            $berkas = $spj->berkas()->find($berkas_id);
        }

        $file = request()->file('file');
        $nama = $file->getClientOriginalName();
        $nama_random = str_random(16) . '.' . $file->extension();
        $dir = 'storage/berkas/';
        $path = $dir.$nama_random;
        $file->move($dir, $nama_random);

        $berkas->nama = $nama;
        $berkas->path = $path;
        $berkas->spj_detail_id = request()->input('spj_detail_id');
        $berkas->deskripsi = request()->input('deskripsi');

        $berkas->save();

        return Resolver('complete');  
    }
}
