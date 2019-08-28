<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use \GetSpj as GetSpj;
use \PostSpj as PostSpj;
use \GetDataDasarDpa as GetDpa;

use \GetSpjBerkas as GetSpjBerkas;
use \PostSpjBerkas as PostSpjBerkas;

class SpjBerkasController extends Controller
{
    public function index($spj_id)
    {
        $spj = GetSpj::find($spj_id);
        $berkas = $spj->berkas;

        return Resolver(compact('spj', 'berkas'));
    }

    public function create($spj_id)
    {
        return $this->form($spj_id);
    }

    public function form($spj_id, $berkas_id = null)
    {
        $spj = GetSpj::find($spj_id);
        $permohonan = $spj->permohonan;

        if(!is_null($berkas_id)){
            $berkas = $spj->berkas()->find($berkas_id);
        }else{
            $berkas = null;
        }

            $dpa = GetDpa::tahun()->where('kode_dpa', request()->input('kode_dpa'))->first();
            $listKodeRekening = \DB::select("
                                        SELECT
                                            `data_dpa`.`jenis_anggaran`,
                                            `data_dpa`.`kode_rekening`,
                                            `data_dpa`.`kode_surat`,
                                            `data_dpa`.`jenis`,
                                            `data_dpa`.`nama`
                                        FROM
                                            `data_dpa`
                                        WHERE
                                            `data_dpa`.`jenis` = 'belanja-5'
                                        GROUP BY
                                            `data_dpa`.`jenis_anggaran`,
                                            `data_dpa`.`kode_rekening`,
                                            `data_dpa`.`kode_surat`,
                                            `data_dpa`.`jenis`,
                                            `data_dpa`.`nama`
                                        ");

        $listJenis = config('spj.jenis_berkas', []);

        return Resolver(compact(
            'spj', 
            'permohonan',
            'listKodeRekening',
            'listJenis',
            'berkas'
        ));  
    }

    public function store($spj_id)
    {
        return $this->save($spj_id);
    }

    public function save($spj_id, $berkas_id = null)
    {
        $this->validate(request(), [
            'file' => 'required|file'
        ]);

        $spj = PostSpj::find($spj_id);

        if(is_null($berkas_id)){
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
        $berkas->spj_id = $spj_id;
        $berkas->permohonan_id = $spj->permohonan_id;
        $berkas->permohonan_detail_id = request()->input('permohonan_detail_id');
        $berkas->jenis = request()->input('jenis');
        $berkas->deskripsi = request()->input('deskripsi');

        $berkas->save();

        return Resolver('complete');  
    }

    public function upload($id = null)
    {

        $this->validate(request(), [
            'file' => ($id ? '' : 'file|required')
        ]);

        $berkas = new PostSpjBerkas;

        $spj = PostSpj::find(request()->input('id'));

        if(request()->hasFile('file')){
            $file = request()->file('file');
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
        $berkas->nama = $nama;
        $berkas->path = $path;
        $berkas->spj_id = request()->input('id');
        $berkas->permohonan_id = request()->input('permohonan_id'); 
        $berkas->permohonan_detail_id = request()->input('permohonan_detail_id');
        $berkas->nomor = request()->input('kode_rekening');
        $berkas->jenis = request()->input('jenis');
        $berkas->deskripsi = request()->input('deskripsi');
        
        $berkas->save();

        return Resolver('complete');  
    }

    public function download($spj_id, $berkas_id, $nama)
    {
        $spj = GetSpj::find($spj_id);
        $berkas = $spj->berkas()->find($berkas_id);

        return response()->download(public_path($berkas->path), $berkas->nama);
    }

    public function destroy($spj_id, $berkas_id)
    {
        $spj = PostSpj::find($spj_id);
        $berkas = $spj->berkas()->find($berkas_id);
        @unlink(public_path($berkas->path));
        $berkas->delete();

        return Resolver('complete without back');  
    }
}
