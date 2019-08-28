<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use \GetDataDasarPegawai as GetPegawai;
use \GetDataDasarPimpinan as GetPimpinan;
use \GetDataDasarBendahara as GetBendahara;
use \GetDataDasarDpa as GetDpa;
use \GetDataDasarLokasi as GetLokasi;
use \GetDataDasarKpa as GetKpa;
use \GetDataDasarPptk as GetPptk;

use \GetLampiranPerjadin as GetPerjadin;
use \GetLampiranPerjadinDetail as GetDetail;
use \GetLampiranPerjadinBiaya as GetBiaya;
use \GetLampiranPerubahan as GetPerubahan;

use \PostDataDasarPegawai as PostPegawai;
use \PostDataDasarPimpinan as PostPimpinan;
use \PostDataDasarBendahara as PostBendahara;
use \PostDataDasarDpa as PostDpa;
use \PostDataDasarLokasi as PostLokasi;
use \PostDataDasarKpa as PostKpa;
use \PostDataDasarPptk as PostPptk;

use \PostLampiranPerjadin as PostPerjadin;
use \PostLampiranPerjadinDetail as PostDetail;
use \PostLampiranPerjadinBiaya as PostBiaya;
use \PostLampiranPerubahan as PostPerubahan;

use Carbon\Carbon;

class LampiranPerjadinPerubahanController extends Controller
{
    public function index()
    {
        $perjadin = GetPerjadin::with('kpa')
        ->with('pptk')
        ->with('bendahara')
        ->with('pimpinan')
        ->with('perubahan_baru')
        ->orderBy('id', 'desc')
        ->paginate(20); // api

        return Resolver(compact('perjadin'));
    }

    public function edit($id)
    {
        return $this->form($id);
    }

    public function create()
    {
        return $this->form();
    }

    public function form($id = null)
    {
        $nomor_last = null;
        $tahun = tahun();

        $perjadin = GetPerjadin::with('kpa')
            ->with('bendahara')
            ->with('pimpinan')->with('pptk')->find($id);

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

        $listLokasi = GetLokasi::whereNull('induk_id')->with('sub')->get();

        if (strpos(\URL::current(),'create')) {
            $listPerjadin = nomor_spt();
        } else {
            $listPerjadin = $perjadin->nomor_spt;
        }        
        
        $listKpa = GetKpa::with('pegawai')->orderBy('singkatan')->get();
        $listPptk = GetPptk::with('pegawai')->orderBy('singkatan')->get();

        return Resolver(compact(
            'dpa',
            'bendahara',
            'pimpinan',
            'listPerjadin',
            'listProgramKegiatan',
            'listKodeRekening',
            'listPegawai',
            'listLokasi',
            'listKpa',
            'listPptk'
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
        $tahun = tahun();

        $this->validate(request(), [
            'nomor_spt' => 'required', 
            'tanggal' => 'required', 
            'kode_dpa' => 'required',
            'kode_rekening' => 'required', 
            'uraian' => 'required', 
            'keterangan' => 'required',
            'tanggal_berangkat' => 'required', 
            'tanggal_kembali' => 'required', 
            'lokasi_id' => 'required', 
            'lokasi_nama' => 'required',
            'tempat_tujuan' => 'required',      
            
            'pimpinan_id' => 'required',
            'bendahara_id'  => 'required',

            'kpa_id' => 'required',
            'pptk_id' => 'required',            
        ]);

        if($id) {
            $perjadin = PostPerjadin::find($id);
        }else{
            $perjadin = new PostPerjadin;
        }

        $kode_rekening = request()->input('kode_rekening');
        $kode_dpa = sprintf('%s.%s', request()->input('kode_dpa'), $kode_rekening);

        $dpa = GetDpa::tahun()
                ->where('kode_dpa', request()->input('kode_dpa'))
                ->first();

        $rincian = GetDpa::tahun()->where('kode_dpa', $kode_dpa)
                    ->first();

        $tanggal =  request()->input('tanggal'); 
        $tanggal_berangkat =  request()->input('tanggal_berangkat'); 
        $tanggal_kembali =  request()->input('tanggal_kembali'); 

        $nomor_spt = request()->input('nomor_spt');

        $perjadin->nomor_urut = intval(data_get(explode('/', $nomor_spt), 1));
        $perjadin->nomor_spt = $nomor_spt;

        $perjadin->kode_dpa = data_get($dpa, 'kode_dpa');
        $perjadin->kode_rekening = request()->input('kode_rekening');
        $perjadin->kegiatan = data_get($dpa, 'nama');
        $perjadin->rincian = data_get($rincian, 'nama');

        $perjadin->tahun = $tahun;
        $perjadin->tanggal = $tanggal;
        $perjadin->tanggal_berangkat = $tanggal_berangkat;
        $perjadin->tanggal_kembali = $tanggal_kembali;

        $_berangkat = new DateTime($tanggal_berangkat);
        $_kembali = new DateTime($tanggal_kembali);
        $diff = $_kembali->diff($_berangkat)->format("%a") + 1;

        $perjadin->lama_perjalanan = $diff; 

        $perjadin->uraian = request()->input('uraian');
        $perjadin->keterangan = request()->input('keterangan');

        $perjadin->lokasi_id = request()->input('lokasi_id'); 
        $perjadin->lokasi_nama = request()->input('lokasi_nama'); 

        $perjadin->tempat_tujuan = request()->input('tempat_tujuan');

        $perjadin->kpa_id = request()->input('kpa_id'); 
        $perjadin->pptk_id = request()->input('pptk_id'); 

        $perjadin->bendahara_id = request()->input('bendahara_id');

        $perjadin->pimpinan_id = request()->input('pimpinan_id'); 

        if($id){
            $perjadin->updated_by = auth()->user()->username;
        }else{
            $perjadin->created_by = auth()->user()->username;
        }

        $perjadin->save();

        $back = false;
        $info = "complete";

        return Resolver(compact('back', 'info'));  
        
        // karena pake Morph makanya tidak konek
        $perubahan = $perjadin->perubahan_baru;
        $perubahan->nomor_baru = $perjadin->nomor_spt;
        $perubahan->save();
    }


    public function ajukan($id)
    {
        $perjadin = PostPerjadin::where('id', $id)->first();
        $perjadin->status = 1;
        $perjadin->save();

        return Resolver('complete without back'); 
    }

    public function destroy($id)
    {
        $perjadin = PostPerjadin::find($id);

        if($perjadin) {
            $perjadin->perubahan_baru()->delete();
            $perjadin->perubahan_lama()->delete();
            $perjadin->detail()->delete();
            $perjadin->biaya()->delete();
            $perjadin->delete();
        }
        
        return Resolver('complete without back');          
    }
}
