<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use \GetPengaturan as GetPengaturan;
use \GetDataDasarKas as GetKas;
use \GetDataDasarDpa as GetDpa;
use \GetDataDasarTahun as GetTahun;

use \PostPengaturan as PostPengaturan;
use \PostDataDasarKas as PostKas;
use \PostDataDasarDpa as PostDpa;
use \PostDataDasarTahun as PostTahun;

use Maatwebsite\Excel\Facades\Excel;

class PengaturanController extends Controller
{

    public function index()
    {
        return Resolver('complete'); 
    }

    public function pajakForm()
    {
        $pajak = PostPengaturan::whereIn('key', explode(",",request()->orientation))->pluck('value', 'key');        

        $listGolongan = config('spj.golongan');

        return Resolver(compact('listGolongan', 'pajak'));
    }

    public function pajakSave()
    {
        $listGolongan = config('spj.golongan'); 

        $listValue = [];
        foreach ($listGolongan as $key => $value) {
            $value = request(tahun().'_pajak_pph21_'.str_slug($key));
            $keyDb = tahun().'.pajak.pph21.'. str_slug($key);

            $pengaturan = PostPengaturan::firstOrCreate(['key'=>$keyDb]);
            $pengaturan->update(['value'=>$value]);
            $listValue[] = $value;
        }

        $value = request(tahun().'_pajak_ppn');
        $keyDb = tahun().'.pajak.ppn';

        $pengaturan = PostPengaturan::firstOrCreate(['key'=>$keyDb]);
        $pengaturan->update(['value'=>$value]);

        $value = request(tahun().'_pajak_pph21');
        $keyDb = tahun().'.pajak.pph21';

        $pengaturan = PostPengaturan::firstOrCreate(['key'=>$keyDb]);
        $pengaturan->update(['value'=>$value]);

        $value = request(tahun().'_pajak_pph22');
        $keyDb = tahun().'.pajak.pph22';

        $pengaturan = PostPengaturan::firstOrCreate(['key'=>$keyDb]);
        $pengaturan->update(['value'=>$value]);

        $value = request(tahun().'_pajak_pph23');
        $keyDb = tahun().'.pajak.pph23';

        $pengaturan = PostPengaturan::firstOrCreate(['key'=>$keyDb]);

        $pengaturan->update(['value'=>$value]);

        return Resolver('complete without back');  
    }

    public function honorForm()
    {
        $honor = PostPengaturan::whereIn('key', explode(",",request()->orientation))->pluck('value', 'key');        

        return Resolver(compact('honor')); 
    }

    public function honorSave()
    {
        $listLimit = config('spj.honor.limit');
        
        foreach ($listLimit as $key => $label) {
            $value = request(tahun().'_honor_limit_'.str_replace('.', '_', $key));
            $keyDb = tahun().'.honor.limit.'. $key;

            PostPengaturan::where('key', $keyDb)->update(['value'=>$value]);
        }

        return Resolver('complete without back');  
    }

    public function sppdForm()
    {
        $sppd = PostPengaturan::whereIn('key', explode(",",request()->orientation))->pluck('value', 'key');        

        return Resolver(compact('sppd'));  
    }

    public function sppdSave()
    {
        $value = request(tahun().'_sppd_limit');
        $keyDb = tahun().'.sppd.limit';

        $pengaturan = PostPengaturan::firstOrCreate(['key'=>$keyDb]);
        $pengaturan->update(['value'=>$value]); 

        return Resolver('complete without back');  
    }

    public function nomorSuratForm()
    {
        $nomor = PostPengaturan::whereIn('key', explode(",",request()->orientation))->pluck('value', 'key');     

        $list = config('spj.surat');

        return Resolver(compact('list','nomor'));
    }

    public function nomorSuratSave()
    {
        $list = config('spj.surat');

        $listValue = [];
        foreach ($list as $key => $label) {
            $value = request(tahun().'_surat_'.str_slug($key));
            $keyDb = tahun().'.surat.'. str_slug($key);

            $pengaturan = PostPengaturan::firstOrCreate(['key'=>$keyDb]);
            $pengaturan->update(['value'=>$value]);
            $listValue[] = $value;
        }

        return Resolver('complete without back'); 
    }

    public function aliranKas()
    {    

        $tahun = tahun();
        $jenis_anggaran = jenis_anggaran();

        $query_dpa = GetDpa::where('tahun', $tahun)
                ->where('jenis_anggaran', $jenis_anggaran);

        $dpa = with(clone $query_dpa)
                ->whereIn('jenis', ['belanja-induk', 'program', 'kegiatan'])
                ->get();

        $total = with(clone $query_dpa)
                ->whereLevel('1')
                ->sum('pagu');

        return Resolver(compact('tahun', 'jenis_anggaran', 'dpa', 'total')); 
    }

    public function aliranKasRincian($id)
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
                    ->whereNotIn('jenis', ['judul', 'rincian'])
                    ->get();

        $rincian->each(function($item){
            $view = request()->input('view') ?: 'bulan';

            $query_aliran = GetKas::where('tahun', $item->tahun)
                            ->where('jenis_anggaran', $item->jenis_anggaran)
                            ->where('kode_dpa', $item->kode_dpa)
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

        return Resolver(compact('tahun', 'jenis_anggaran', 'program', 'kegiatan', 'rincian'));
    }

    public function aliranKasUpload()
    {
        $listTahun = GetTahun::pluck('tahun');
        if(empty($listTahun)){
            $listTahun = range(2018, date('Y'));
        }
        $listAnggaran = ['murni' => 'MURNI', 'perubahan' => 'PERUBAHAN'];

        return Resolver(compact('listTahun', 'listAnggaran'));
    }

    public function aliranKasUploadProcess()
    {
        $this->validate(request(), [
            'tahun' => 'required|numeric|min:1900|max:' . (date('Y') + 10),
            'jenis_anggaran' => 'required',
            'file' => 'required|file'
        ]);

        $tahun = intval(request()->input('tahun'));
        $jenis_anggaran = request()->input('jenis_anggaran');

        $path = request()->file('file')->path();
        $reader = Excel::selectSheetsByIndex(0)->load($path, 'UTF-8')->noHeading()->get();

        $data = [];

        $anggaranPerTahunStart = 17;
        $anggaranPerBulanStart = 18;

        PostKas::truncate();

        foreach($reader as $index => $item){
            $keyAnggaranPerbulan = $anggaranPerBulanStart;
            $kode_rekening = $item[2];


            if(str_is('5.2.*', $kode_rekening) or str_is('05.2.*', $kode_rekening)){
                $kode_rekening_explode = explode('.', $kode_rekening);
                $level = count($kode_rekening_explode) - 1;
                // 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17
                // a b c d e f g h i j k  l  m  n  o  p  q  r

                if($level < 4){
                    continue;
                }

                $kode_program = array_get($kode_rekening_explode, 2);
                $kode_kegiatan = array_get($kode_rekening_explode, 3);
                $kode_dpa = sprintf('%02d.%02d', $kode_program, $kode_kegiatan);


                $kegiatan = GetDpa::where('jenis', 'kegiatan')
                        ->where('kode_dpa', 'LIKE', '%.' . $kode_dpa)
                        ->first();

                $kode_rekening = str_replace(sprintf('%s.', $kode_dpa), '', $kode_rekening);
                $kode_dpa = sprintf('%s.%s', $kegiatan->kode_dpa, $kode_rekening);

                $dpa = GetDpa::where('kode_dpa', $kode_dpa)->first();

                $keyUraian = 8;
                $uraian = $item[$keyUraian];
                while(empty($uraian)){
                    $keyUraian += 1;
                    $uraian = $item[$keyUraian];
                    if($keyUraian >= 17){
                        break;
                    }
                }

                $anggaran_tahun_ini = $item[$anggaranPerTahunStart];
                $anggaran_perbulan = [];
                foreach(range(1, 12) as $indexBulan => $bulan){
                    $temp_anggaran_perbulan = $item[$keyAnggaranPerbulan];
                    while(is_null($temp_anggaran_perbulan)){
                        $keyAnggaranPerbulan++;
                        $temp_anggaran_perbulan = $item[$keyAnggaranPerbulan];

                        if($keyAnggaranPerbulan>=40){
                            break;
                        }
                    }

                    $keyAnggaranPerbulan++;

                    $anggaran_perbulan[] = $temp_anggaran_perbulan;
                }

                foreach($anggaran_perbulan as $indexBulan => $pagu_rencana){
                    PostKas::create([
                        'tahun' => $tahun,
                        'jenis_anggaran' => $jenis_anggaran,
                        'kode_dpa' => $kode_dpa,
                        'kode_rekening' => $kode_rekening,
                        'jenis' => $dpa->jenis,
                        'level' => $dpa->level,
                        'bulan' => ($indexBulan + 1),
                        'rencana' => $pagu_rencana,
                        'indikatif' => $pagu_rencana,
                    ]);
                }
            }
        }

        GetDpa::where('tahun', $tahun)
        ->where('jenis_anggaran', $jenis_anggaran)
        ->whereIn('jenis', ['belanja-1', 'belanja-2'])
        ->each(function($item){
            \DB::enableQueryLog();
            $anggaran_perbulan = GetKas::where('tahun', $item->tahun)
                            ->where('jenis_anggaran', $item->jenis_anggaran)
                            ->where('kode_dpa', 'LIKE', ($item->kode_dpa . '.%'))
                            ->where('jenis', 'belanja-3')
                            ->selectRaw('
                                jenis_anggaran,
                                tahun,
                                bulan,
                                SUM(sisa_bulan_lalu) as sisa_bulan_lalu,
                                SUM(rencana) as rencana,
                                SUM(indikatif) as indikatif,
                                SUM(diajukan) as diajukan,
                                SUM(disetujui) as disetujui,
                                SUM(sisa_bulan_ini) as sisa_bulan_ini
                            ')
                            ->groupBy([
                                'jenis_anggaran',
                                'tahun',
                                'bulan',
                            ])->get();

            foreach($anggaran_perbulan as $indexBulan => $kas){
                PostKas::create([
                    'tahun' => $kas->tahun,
                    'jenis_anggaran' => $kas->jenis_anggaran,
                    'kode_dpa' => $item->kode_dpa,
                    'kode_rekening' => $item->kode_rekening,
                    'jenis' => $item->jenis,
                    'level' => $item->level,
                    'bulan' => $kas->bulan,
                    'rencana' => $kas->rencana,
                    'indikatif' => $kas->indikatif,
                ]);
            }
        });

        return Resolver('complete');          
    }

}
