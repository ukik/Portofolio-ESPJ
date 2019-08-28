<?php

use \GetDataDasarLokasi as GetLokasi;
use \GetDataDasarLokasiLuarNegeri as GetLokasiLuarNegeri;

use \PostDataDasarLokasi as PostLokasi;
use \PostDataDasarLokasiLuarNegeri as PostLokasiLuarNegeri;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DataDasarLokasiLuarNegeriController extends Controller
{
    public function index()
    {
        $lokasi = GetLokasiLuarNegeri::whereNull('induk_id')
            ->with('sub')
            ->orderBy('id', 'asc')
            ->paginate(10); # api revision

        return Resolver(compact('lokasi'));
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
        if (!is_null($id)) {
            $lokasi = GetLokasiLuarNegeri::find($id);
        }else {
            $lokasi = null;
        }

        $induk = GetLokasiLuarNegeri::find(request()->input('induk'));
        $listJenis = config('spj.jenis_lokasi_ln',[]);

        return Resolver(compact('lokasi', 'induk', 'listJenis'));
    }

    public function save($id = null)
    {
        $this->validate(request(), [
            'nama' => 'required',
            'singkatan' => 'required',
            'jenis' => 'required',
        ]);

        if ($id) {
            $lokasi = PostLokasiLuarNegeri::find($id);
        }else {
            $lokasi = new PostLokasiLuarNegeri;
        }

        $lokasi->nama = request()->input('nama');
        $lokasi->singkatan = request()->input('singkatan');
        $lokasi->nama_ibu_kota = request()->input('nama_ibu_kota');
        $lokasi->jenis = request()->input('jenis');
        $lokasi->tahun = tahun();
        
        if (request()->has('induk')) {
            $lokasi->induk_id = request()->input('induk');
        }

        $lokasi->save();

        return Resolver('complete');
    }

    public function store()
    {
        return $this->save();
    }

    public function update($id)
    {
        return $this->save($id);
    }

    public function destroy($id)
    {
        $lokasi = PostLokasiLuarNegeri::find($id);
        if ($lokasi) {
            $lokasi->delete();
        }

        return Resolver('complete without back');        
    }
}
