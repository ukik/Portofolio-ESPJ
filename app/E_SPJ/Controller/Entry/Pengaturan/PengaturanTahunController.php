<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;

use \GetDataDasarTahun as GetTahun;
use \PostDataDasarTahun as PostTahun;

class PengaturanTahunController extends Controller
{
    public function index()
    {
        $tahun = GetTahun::orderBy('id', 'desc')->paginate(20);

        return Resolver(compact('tahun'));
    }

    public function form($id = null)
    {
        if (!is_null($id)) {
            if ($id) {
                $tahun = GetTahun::find($id);
            }
        }else {
            $tahun = null;
        }
        return Resolver(compact('tahun'));
    }

    public function simpan($id = null)
    {
        $this->validate(request(),[
            'tahun' => 'required|numeric|min:1900|max:' . (date('Y') + 10)
        ]);

        if ($id) {
            $tahun = PostTahun::find($id);
        }else {
            $tahun = new PostTahun;
        }

        $tahun->tahun = request()->input('tahun');
        $tahun->save();

        return Resolver('complete');  
    }

    public function create()
    {
        return $this->form();
    }

    public function edit($id)
    {
        return $this->form($id);
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
        $tahun = PostTahun::find($id);
        $tahun->delete();

        return Resolver('complete without back');  
    }    
}
