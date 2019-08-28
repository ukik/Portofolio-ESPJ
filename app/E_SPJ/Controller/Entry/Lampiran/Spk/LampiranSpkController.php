<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use \GetLampiranSpk as GetSpk;
use \GetLampiranSpkRab as GetRab;
use \GetDataDasarKpa as GetKpa;
use \GetDataDasarDpa as GetDpa;
use \GetDataDasarPptk as GetPptk;
use \GetDataDasarBendahara as GetBendahara;
use \GetDataDasarPimpinan as GetPimpinan;
use \GetDataDasarRekanan as GetRekanan;
use \GetDataDasarLokasi as GetLokasi;

use \PostLampiranSpk as PostSpk;
use \PostLampiranSpkRab as PostRab;
use \PostDataDasarKpa as PostKpa;
use \PostDataDasarDpa as PostDpa;
use \PostDataDasarPptk as PostPptk;
use \PostDataDasarBendahara as PostBendahara;
use \PostDataDasarPimpinan as PostPimpinan;
use \PostDataDasarRekanan as PostRekanan;

use Carbon\Carbon;

class LampiranSpkController extends Controller
{
    public function index()
    {
        $spk = GetSpk::with('kpa')
            ->with('pptk')
            ->orderBy('id', 'desc')
            ->paginate(20);

        return Resolver(compact('spk'));
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
            $spk = GetSpk::with('kpa')->with('pptk')->find($id);
        }else{
            $spk = null;
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

        $listRekanan = GetRekanan::get();
        $listPelaksanaanSatuan = ['Hari', 'Bulan'];
        $listJenis = ['besar' => 'Besar', 'kecil' => 'Kecil'];
        $listLokasi = GetLokasi::whereNull('induk_id')->with('sub')->get();

        if (strpos(\URL::current(),'create')) {
            $listSpk = nomor_spk();
        } else {
            $listSpk = $spk->nomor_spk; 
        }

        return Resolver(compact(
            'bendahara',
            'pimpinan',
            'listSpk',
            'dpa',
            'listProgramKegiatan',
            'listKodeRekening',
            'listRekanan',
            'listPelaksanaanSatuan',
            'listJenis',
            'listLokasi',
            'spk'
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

        $this->validate(request(), [

            'tanggal' => 'required',
            'jenis' => 'required',
            'kode_dpa' => 'required',
            'kode_rekening' => 'required',
            'nama_pekerjaan' => 'required',
            'uraian' => 'required',
            'rekanan_id' => 'required',
            'rekanan_jabatan' => 'required',
            'pelaksanaan_jumlah' => 'required',
            'pelaksanaan_satuan' => 'required',
            'terbit_lokasi' => 'required',
            'terbit_tanggal' => 'required',     
            
            'pimpinan_id' => 'required',
            'bendahara_id'  => 'required',                   
        ]);

        if($id) {
            $spk = PostSpk::find($id);
        }else{
            $spk = new PostSpk;
        }

        $kode_rekening = request()->input('kode_rekening');
        $kode_dpa = sprintf('%s.%s', request()->input('kode_dpa'), $kode_rekening);

        $dpa = GetDpa::tahun()
                ->where('kode_dpa', request()->input('kode_dpa'))
                ->first();

        $rincian = GetDpa::tahun()->where('kode_dpa', $kode_dpa)
                    ->first();

        $rekanan = GetRekanan::where('id', request()->input('rekanan_id'))->first();
        $tanggal = request()->input('tanggal'); 
        $terbit_tanggal = request()->input('terbit_tanggal');

        $nomor_spk = nomor_spk($spk->nomor_urut);

        $spk->nomor_urut = intval(data_get(explode('/', $nomor_spk), 1));
        $spk->nomor_spk = $nomor_spk;

        $spk->jenis = request()->input('jenis', 'besar');
        $spk->tanggal = $tanggal;
        $spk->nama_pekerjaan = request()->input('nama_pekerjaan');

        $spk->kode_dpa = data_get($dpa, 'kode_dpa');
        $spk->kode_rekening = request()->input('kode_rekening');
        $spk->kegiatan = data_get($dpa, 'nama');
        $spk->rincian = data_get($rincian, 'nama');

        $spk->rekanan_id = $rekanan->id;
        $spk->rekanan_nama_perusahaan = object_get($rekanan, 'nama_perusahaan', '-');
        $spk->rekanan_nama_pimpinan = object_get($rekanan, 'nama_pimpinan', '-');
        $spk->rekanan_jabatan = request()->input('rekanan_jabatan');
        $spk->rekanan_alamat = object_get($rekanan,'alamat','-');

        $spk->kpa_id = request()->input('kpa_id'); 
        $spk->pptk_id = request()->input('pptk_id');

        $spk->bendahara_id = request()->input('bendahara_id');

        $spk->pimpinan_id = request()->input('pimpinan_id');

        $spk->pelaksanaan_jumlah = request()->input('pelaksanaan_jumlah');
        $spk->pelaksanaan_satuan = request()->input('pelaksanaan_satuan');

        $spk->uraian = request()->input('uraian');
        $spk->terbit_lokasi = request()->input('terbit_lokasi');
        $spk->terbit_tanggal = $terbit_tanggal;

        if($id){
            $spk->updated_by = auth()->user()->username;
        }else{
            $spk->created_by = auth()->user()->username;
        }

        $spk->save();

        return Resolver('complete');     
    }

    public function destroy($id)
    {
        $spk = PostSpk::find($id);

        if($spk) {
            $spk->perubahan_baru()->delete();
            $spk->perubahan_lama()->delete();
            $spk->rab()->delete();
            $spk->detail()->delete();
            $spk->delete();            
        }

        return Resolver('complete without back');          
    }

    public function ajukan($id)
    {
        $spk = PostSpk::where('id', $id)->first();
        $spk->status = 1;
        $spk->save();

        return Resolver('complete without back'); 
    }

    public function batal($id)
    {
        $spk = PostSpk::where('id', $id)->first();
        $spk->status = 0;
        $spk->save();

        return Resolver('complete without back');  
    }

    public function print($id)
    {
        $spk = GetSpk::with('perubahan_baru')->with('perubahan_lama')->find($id);
        $permohonan_detail = $spk->permohonan;
        $permohonan = $permohonan_detail->permohonan;

        $view = strtolower($spk->jenis);

        return view('lampiran.spk.print.spk-' . $view, compact('spk', 'permohonan'));
        return Resolver(compact('spk', 'permohonan'));
    }

    public function telaah($id)
    {
        $spk = GetSpk::find($id);
        $permohonan_detail = $spk->permohonan;
        $permohonan = $permohonan_detail->permohonan;

        $view = strtolower($spk->jenis);

        return view('lampiran.spk.print.telaah-' . $view, compact('spk', 'permohonan'));
        return Resolver(compact('spk', 'permohonan'));
    }
}
