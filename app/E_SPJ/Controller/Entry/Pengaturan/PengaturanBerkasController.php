<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;

use \GetBerkas as GetBerkas;
use \PostBerkas as PostBerkas;

class PengaturanBerkasController extends Controller
{
    public function index()
    {
        $berkas = GetBerkas::orderBy('id', 'desc')->paginate(20);

        return Resolver(compact('berkas'));
    }

    public function form($id = null)
    {
        if (!is_null($id)) {
            if ($id) {
                $berkas = GetBerkas::find($id);
            }
        }else {
            $berkas = null;
        }

        return Resolver(compact('berkas'));
    }

    public function save($id = null)
    {

        $this->validate(request(), [
            'berkas' => ($id ? '' : 'file|required')
        ]);

        if ($id) {
            $berkas = PostBerkas::find($id);
        }else {
            $berkas = new PostBerkas;
        }

        if(request()->hasFile('berkas')){
            $file = request()->file('berkas');
            $nama = $file->getClientOriginalName();
            $extension = $file->extension();
            if(empty($extension)){
                $extension = explode('.', $nama);
                $extension = end($extension);
            }
            $nama_random = str_random(16) . '.' . $extension;
            $dir = 'storage/berkas/';
            $path = $dir.$nama_random;
            $file->move($dir, $nama_random);
            $berkas->path = $path;
            $berkas->nama = $nama;
        }
        $berkas->deskripsi = request()->input('deskripsi');
        $berkas->aktif = request()->input('aktif') == true ? 1 : 0;

        $berkas->save();

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
        return $this->save();
    }

    public function update($id)
    {
        return (request());
        return $this->save($id);
    }

    // exclusive for axios update file
    // axios put for updating file is not supported
    // axios put only support json (currently)
    // axios post support file form-data
    public function updateBerkas($id)
    {
        $this->validate(request(), [
            'berkas' => ($id ? '' : 'file|required')
        ]);

        $berkas = PostBerkas::find($id);

        if(request()->hasFile('berkas')){
            $file = request()->file('berkas');
            $nama = $file->getClientOriginalName();
            $extension = $file->extension();
            if(empty($extension)){
                $extension = explode('.', $nama);
                $extension = end($extension);
            }
            $nama_random = str_random(16) . '.' . $extension;
            $dir = 'storage/berkas/';
            $path = $dir.$nama_random;
            $file->move($dir, $nama_random);
            $berkas->path = $path;
            $berkas->nama = $nama;
        }
        $berkas->deskripsi = request()->input('deskripsi');
        $berkas->aktif = request()->input('aktif') == true ? 1 : 0;

        $berkas->save();

        return Resolver('complete');  
    }

    public function destroy($id)
    {
        $berkas = PostBerkas::find($id);
        @unlink(public_path($berkas->path));
        $berkas->delete();

        return Resolver('complete without back');  
    }
}
