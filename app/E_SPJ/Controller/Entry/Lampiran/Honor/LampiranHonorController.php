<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use \GetLampiranHonor as GetHonor;
use \GetDataDasarKpa as GetKpa;
use \GetDataDasarDpa as GetDpa;
use \GetDataDasarPptk as GetPptk;
use \GetDataDasarBendahara as GetBendahara;
use \GetDataDasarPimpinan as GetPimpinan;

use \PostLampiranHonor as PostHonor;
use \PostDataDasarKpa as PostKpa;
use \PostDataDasarDpa as PostDpa;
use \PostDataDasarPptk as PostPptk;
use \PostDataDasarBendahara as PostBendahara;
use \PostDataDasarPimpinan as PostPimpinan;

use Carbon\Carbon;

class LampiranHonorController extends Controller
{
    public function index()
    {
        $honor = GetHonor::with('kpa')
            ->with('pptk')
            ->orderBy('id', 'desc')
            ->paginate(20);

        return Resolver(compact('honor'));
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
        if(!is_null($id)) {
            $honor = GetHonor::with('kpa')->with('pptk')->find($id);
        }

        $listProgramKegiatan = GetDpa::tahun()->where(function($subquery){
            $subquery->whereIn('jenis', ['program']);
        })->get();

        $listProgramKegiatan->each(function($item){
            $item->kegiatan = GetDpa::tahun()
                            ->where('jenis', 'kegiatan')
                            ->where('kode_dpa', 'LIKE', $item->kode_dpa.'.%')
                            ->has('kpa1.pegawai.bidang')
                            ->has('pptk1.pegawai.bidang')
                            ->get();
        });


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

        $pimpinan = GetPimpinan::tahun()->aktif()->get();
        $bendahara = GetBendahara::tahun()->aktif()->get();

        $listJenis = ['PNS', 'Non PNS', 'Luar Instansi'];

        $listKpa = GetKpa::with('pegawai')->orderBy('singkatan')->get();
        $listPptk = GetPptk::with('pegawai')->orderBy('singkatan')->get();

        return Resolver(compact(
            'dpa',
            'bendahara',
            'pimpinan',
            'listProgramKegiatan',
            'listKodeRekening',
            'listJenis',
            'honor'
        ));

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
        $this->validate(request(),[
            'uraian' => 'required', 
            'jenis' => 'required', 
            'tanggal' => 'required', 
            'kode_dpa' => 'required', 
            'kode_rekening' => 'required',            

            'pimpinan_id' => 'required',
            'bendahara_id'  => 'required',      
            
            'kpa_id' => 'required',
            'pptk_id' => 'required',            
        ]);

        if($id) {
            $honor = PostHonor::find($id);
        }else{
            $honor = new PostHonor;
        }

        $kode_rekening = request()->input('kode_rekening');
        $kode_dpa = sprintf('%s.%s', request()->input('kode_dpa'), $kode_rekening);

        $dpa = GetDpa::tahun()
                ->where('kode_dpa', request()->input('kode_dpa'))
                ->first();

        $rincian = GetDpa::tahun()->where('kode_dpa', $kode_dpa)
                    ->first();

        $tanggal =  request()->input('tanggal'); 

        $honor->jenis = request()->input('jenis');
        $honor->uraian = request()->input('uraian');

        $honor->kode_dpa = data_get($dpa, 'kode_dpa');
        $honor->kode_rekening = request()->input('kode_rekening');
        $honor->kegiatan = data_get($dpa, 'nama');
        $honor->rincian = data_get($rincian, 'nama');

        $honor->tanggal = $tanggal;
        $honor->bulan = explode('-', $tanggal)[1]; 
        $honor->tahun = explode('-', $tanggal)[0]; 

        $honor->kpa_id = request()->input('kpa_id'); 
        $honor->pptk_id = request()->input('pptk_id'); 

        $honor->bendahara_id = request()->input('bendahara_id'); 
        
        $honor->pimpinan_id = request()->input('pimpinan_id'); 

        if($id){
            $honor->updated_by = auth()->user()->username;
        }else{
            $honor->created_by = auth()->user()->username;
        }

        $honor->save();

        return Resolver('complete');     
    }

    public function destroy($id)
    {
        $honor = PostHonor::find($id);

        if($honor) {
            $honor->detail()->delete();
            $honor->delete();
        }

        return Resolver('complete without back');      
    }

    public function ajukan($id)
    {
        $honor = PostHonor::where('id', $id)->first();
        $honor->status = 1;
        $honor->save();

        return Resolver('complete without back'); 
    }

    public function batal($id)
    {
        $honor = PostHonor::where('id', $id)->first();
        $honor->status = 0;
        $honor->save();

        return Resolver('complete without back');  
    }

    public function print($id)
    {
        $honor = PostHonor::where('id', $id)->first();
        $detail = $honor->detail;

        if(blank($honor->tanggal_cetak)){
            $honor->printed_by = data_get(auth()->user(), 'username');
            $honor->printed_at = date('Y-m-d');
            $honor->save();
        }

        return view('lampiran.honor.print', compact('honor', 'detail'));
        return Resolver(compact('honor', 'detail')); 
    }

    public function telaah($id)
    {
        $honor = PostHonor::find($id);
        $detail = $honor->detail;

        if(blank($honor->tanggal_cetak)){
            $honor->tanggal_cetak = date('Y-m-d');
            $honor->save();
        }

        return view('lampiran.honor.telaah', compact('honor', 'detail'));
        return Resolver(compact('honor', 'detail'));   
    }
}
