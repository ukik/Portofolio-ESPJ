<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use \GetLampiranPerjadin as GetPerjadin;
use \GetDataDasarPegawai as GetPegawai;
use \GetDataDasarPimpinan as GetPimpinan;
use \GetDataDasarBendahara as GetBendahara;
use \GetDataDasarDpa as GetDpa;
use \GetDataDasarLokasi as GetLokasi;
use \GetDataDasarKpa as GetKpa;
use \GetDataDasarPptk as GetPptk;

use \PostLampiranPerjadin as PostPerjadin;
use \PostDataDasarPegawai as PostPegawai;
use \PostDataDasarPimpinan as PostPimpinan;
use \PostDataDasarBendahara as PostBendahara;
use \PostDataDasarDpa as PostDpa;
use \PostDataDasarLokasi as PostLokasi;
use \PostDataDasarKpa as PostKpa;
use \PostDataDasarPptk as PostPptk;

use Carbon\Carbon;

class LampiranPerjadinController extends Controller
{
    public function index()
    {
        $perjadin = GetPerjadin::select(['kode_rekening'])
            ->doesntHave('perubahan_baru')
            ->paginate(20);

        return Resolver(compact('perjadin'));
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
        $nomor_last = null;
        $tahun = tahun();

        if(!is_null($id)) {
            $perjadin = GetPerjadin::find($id);
        }else{
            $perjadin = null;
        }

        $perjadin = GetPerjadin::find($id);

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

            $dpa = GetDpa::tahun()->where('kode_dpa', $perjadin->kode_dpa)->first();
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

        $pimpinan = GetPimpinan::tahun()->aktif()->first();
        $bendahara = GetBendahara::tahun()->aktif()->first();
        $listLokasi = GetLokasi::tahun()->get();
        
        $listKpa = GetKpa::with('pegawai')->orderBy('singkatan')->get();
        $listPptk = GetPptk::with('pegawai')->orderBy('singkatan')->get();

        return Resolver(compact(
            'dpa',
            'bendahara',
            'pimpinan',
            'listProgramKegiatan',
            'listKodeRekening',
            'listPegawai',
            'listLokasi',
            'perjadin',
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
            'uraian' => 'required',
            'tanggal' => 'required', //|date_format:Y-m-d',
            'tanggal_berangkat' => 'required', //|date_format:Y-m-d',
            'tanggal_kembali' => 'required', //|date_format:Y-m-d',

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

        $tanggal =  plain_date(request()->input('tanggal'));
        $tanggal_berangkat =  plain_date(request()->input('tanggal_berangkat'));
        $tanggal_kembali =  plain_date(request()->input('tanggal_kembali'));

        $nomor_spt = nomor_spt($perjadin->nomor_urut);

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

        $perjadin->lama_perjalanan = $tanggal_kembali->diffInDays($tanggal_berangkat) + 1;

        $perjadin->uraian = request()->input('uraian');
        $perjadin->keterangan = request()->input('keterangan');

        $lokasi = GetLokasi::find(request()->input('lokasi_id'));

        $perjadin->lokasi_id = data_get($lokasi, 'id');
        $perjadin->lokasi_nama = data_get($lokasi, 'nama');

        $perjadin->tempat_tujuan = request()->input('tempat_tujuan');

        $perjadin->kpa_id = request()->input('kpa_id'); 
        $perjadin->pptk_id = request()->input('pptk_id'); 

        $bendahara = GetBendahara::first();
        $perjadin->bendahara_id = data_get($bendahara, 'id');
        $pimpinan = GetPimpinan::first();
        $perjadin->pimpinan_id = data_get($pimpinan, 'id');

        if($id){
            $perjadin->updated_by = auth()->user()->username;
        }else{
            $perjadin->created_by = auth()->user()->username;
        }

        $perjadin->save();

        return Resolver('complete');      
    }

    public function destroy($id)
    {
        $perjadin = PostPerjadin::find($id);

        if($perjadin) {
            $perjadin->detail()->delete();
            $perjadin->delete();
        }

        return Resolver('complete without back');      
    }

    public function ajukan($id)
    {
        $perjadin = PostPerjadin::where('id', $id)->first();
        $perjadin->status = 1;
        $perjadin->save();

        return Resolver('complete without back'); 
    }

    public function batal($id)
    {
        $perjadin = PostPerjadin::where('id', $id)->first();
        $perjadin->status = 0;
        $perjadin->save();

        return Resolver('complete without back');  
    }

    public function print($id)
    {

        $sppd = PostPerjadin::find($id);

        return view('lampiran.perjadin.print', compact('sppd'));
        return Resolver(compact('sppd'));  
    }

    public function telaah($id)
    {
        $perjadin = GetPerjadin::find($id);

        return view('lampiran.perjadin.telaah', compact('perjadin'));
        return Resolver(compact('perjadin'));
    }

}
