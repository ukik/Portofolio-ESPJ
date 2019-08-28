<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use \GetDataDasarLokasi as GetLokasi;
use \PostDataDasarLokasi as PostLokasi;

class DataDasarLokasiController extends Controller
{
    public function index()
    {
        $lokasi = GetLokasi::whereNull('induk_id')
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
            $lokasi = GetLokasi::find($id);
        }else {
            $lokasi = null;
        }

        $induk = GetLokasi::find(request()->input('induk'));
        $listJenis = config('spj.jenis_lokasi',[]);

        return Resolver(compact('lokasi', 'induk', 'listJenis'));

   }

    public function simpan($id = null)
    {
        $this->validate(request(), [
            'nama' => 'required',
            'singkatan' => 'required',
            'jenis' => 'required',
        ]);

        if ($id) {
            $lokasi = PostLokasi::find($id);
        }else {
            $lokasi = new PostLokasi;
        }

        $lokasi->nama = request()->input('nama');
        $lokasi->singkatan = request()->input('singkatan');
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
        return $this->simpan();
    }

    public function update($id)
    {
        return $this->simpan($id);
    }

    public function destroy($id)
    {
        $lokasi = PostLokasi::find($id);
        
        if ($lokasi) {
            $lokasi->delete();
        }

        return Resolver('complete without back');
    }
}
