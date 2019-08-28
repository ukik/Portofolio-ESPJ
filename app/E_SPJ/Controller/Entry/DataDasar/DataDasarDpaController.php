<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use \GetDataDasarDpa as GetDpa;
use \GetDataDasarKpa as GetKpa;
use \GetDataDasarPptk as GetPptk;
use \GetDataDasarKas as GetKas;

use \PostDataDasarDpa as PostDpa;
use \PostDataDasarKpa as PostKpa;
use \PostDataDasarPptk as PostPptk;
use \PostDataDasarKas as PostKas;

class DataDasarDpaController extends Controller
{

    public function index()
    {
        if(!empty($_GET['json'])){
            return $this->jsonIndex();
        }

        $dpa = GetDpa::whereIn('jenis', ['program', 'kegiatan'])
            ->orWhere('kode_dpa', '5.1')
            ->orWhere('kode_dpa', '5.2')
            ->orderBy('kode_dpa');

        $dpa = $dpa->with('kpa1')->with('pptk1')->orderBy('id', 'desc')->get();
        $total = $dpa->sum('pagu');

        return Resolver(compact('dpa', 'total'));
    }

    public function show($id)
    {
        $dpa = GetDpa::with('kpa')->with('pptk')->find($id);

        $kode = explode('.', $dpa->kode_dpa);
        array_pop($kode);

        $program = GetDpa::where([
            'kode_dpa' => implode('.', $kode),
            'tahun' => $dpa->tahun,
            'jenis_anggaran' => $dpa->jenis_anggaran,
            'jenis' => 'program'
        ])->first();

        $rincian = GetDpa::where('kode_dpa', 'LIKE', $dpa->kode_dpa . '.%')
                    ->get();

        return Resolver(compact('dpa', 'program', 'rincian'));
    }

    public function aliranKas($id)
    {
        $tahun = tahun();
        $jenis_anggaran = jenis_anggaran();

        $kegiatan = GetDpa::find($id);
        $kode_rekening_temp = explode('.', $kegiatan->kode_dpa);

        array_pop($kode_rekening_temp);
        $kode_rekening_program = implode('.', $kode_rekening_temp);

        $query_dpa = GetDpa::where('tahun', $tahun)
                    ->where('jenis_anggaran', $jenis_anggaran);

        $program = with(clone $query_dpa)
                    ->where('kode_dpa', $kode_rekening_program)
                    ->where('jenis', 'program')
                    ->first();

        $rincian = with(clone $query_dpa)
                    ->where('kode_dpa', 'LIKE', $kegiatan->kode_dpa . '.%')
                    ->whereNotIn('jenis', ['rincian'])
                    ->get();

        $rincian->each(function($item){
            $view = request()->input('view') ?: 'bulan';

            $query_aliran = GetKas::where('tahun', $item->tahun)
                            ->where('jenis_anggaran', $item->jenis_anggaran)
                            ->where('kode_rekening', $item->kode_rekening);
            if($view === 'triwulan'){
                $listBulanMin = [1, 4, 7, 10];
                $listBulanMax = [3, 6, 9, 12];
                $aliran_kas = [];
                foreach($listBulanMin as $indexBulan => $bulanMin){
                    $bulanMax = $listBulanMax[$indexBulan];
                    $aliran_kas[] = with(clone $query_aliran)->selectRaw('
                                    jenis_anggaran,
                                    tahun,
                                    kode_dpa,
                                    kode_rekening,
                                    SUM(sisa_bulan_lalu) as sisa_bulan_lalu,
                                    SUM(rencana) as rencana,
                                    SUM(indikatif) as indikatif,
                                    SUM(diajukan) as diajukan,
                                    SUM(disetujui) as disetujui,
                                    SUM(sisa_bulan_ini) as sisa_bulan_ini
                    ')
                    ->where('bulan', '<=', $bulanMax)
                    ->where('bulan', '>=', $bulanMin)
                    ->groupBy(['tahun', 'jenis_anggaran', 'kode_dpa', 'kode_rekening'])->first();
                }

                $item->aliran_kas = $aliran_kas;

            }else{
                $item->aliran_kas = with(clone $query_aliran)->get();
            }
        });

        $from = route('dd::dpa.index');

        return Resolver(compact('tahun', 'jenis_anggaran', 'program', 'kegiatan', 'rincian', 'from'));
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
        if(!is_null($id)){
            $dpa = GetDpa::find($id);
        }else{
            $dpa = null;
        }

        $listKpa = GetKpa::with('pegawai')->orderBy('singkatan')->get();
        $listPptk = GetPptk::with('pegawai')->orderBy('singkatan')->get();

        return Resolver(compact('listKpa', 'listPptk', 'dpa'));
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
            'kode_surat' => 'required',
            'kpa_id' => 'required',
            'pptk_id' => 'required',
        ]);

        if($id){
            $dpa = PostDpa::find($id);
        }else{
            $dpa = new PostDpa;
        }
        $kpa = PostKpa::where('id', request()->input('kpa_id'))->first();
        $pptk = PostPptk::where('id', request()->input('pptk_id'))->first();

        $dpa->kode_surat = request()->input('kode_surat');
        $dpa->kpa_id = request()->input('kpa_id');
        $dpa->kpa_singkatan = $kpa->singkatan;
        $dpa->pptk_id = request()->input('pptk_id');
        $dpa->pptk_singkatan = $pptk->singkatan;

        $dpa->save();

        $rincian = PostDpa::where('kode_dpa', 'LIKE', $dpa->kode_dpa . '.%')->update([
            'kpa_id' => $dpa->kpa_id,
            'kpa_singkatan' => $dpa->kpa_singkatan,
            'pptk_id' => $dpa->pptk_id,
            'pptk_singkatan' => $dpa->pptk_singkatan,
        ]);

        return Resolver('complete');
    }

    public function destroy($id)
    {
        $dpa = PostDpa::find($id);

        if($dpa){
            $dpa->delete();
        }

        return Resolver('complete without back');        
    }
}
