<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use \GetPermohonanGantiUang as GetGantiUang;
use \GetDataDasarDpa as GetDpa;
use \GetDataDasarKas as GetKas;
use \GetDataDasarBendahara as GetBendahara;
use \GetDataDasarRekanan as GetRekanan;
use \GetDataDasarPimpinan as GetPimpinan;

use \PostPermohonanGantiUang as PostGantiUang;
use \PostDataDasarDpa as PostDpa;
use \PostDataDasarKas as PostKas;
use \PostDataDasarBendahara as PostBendahara;
use \PostDataDasarRekanan as PostRekanan;
use \PostDataDasarPimpinan as PostPimpinan;

use Carbon\Carbon;

class PermohonanGuController extends Controller
{
    public function index()
    {
        $permohonan = GetGantiUang::with('spj1')->orderBy('id', 'desc')->paginate(20);

        return Resolver(compact('permohonan')); 
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
        $tahun = tahun();
        $nomor_urut = null;
        if(!is_null($id)){
            $permohonan = GetGantiUang::find($id);

            $nomor_urut = data_get($permohonan, 'nomor_urut');
        }else{
            $permohonan = null;
        }

        $jenis = config('spj.spp.' . request()->get('jenis', 'gu'));

        $listProgramKegiatan = GetDpa::tahun()->where(function($subquery){
            $subquery->whereIn('jenis', ['program']);
            $subquery->orWhere('kode_rekening', '5.1');
        })->get();
        

        $listProgramKegiatan->each(function($item){
            $item->kegiatan = GetDpa::tahun()
                            ->where(function($subquery) use($item){
                                if($item->kode_rekening === '5.1'){
                                    $subquery->where('jenis', 'belanja')->where('level', 5);
                                }else{
                                    $subquery->where('jenis', 'kegiatan');
                                }
                            })
                            ->where('kode_dpa', 'LIKE', $item->kode_dpa.'.%')
                            ->has('kpa1.pegawai.bidang')
                            ->has('pptk1.pegawai.bidang')
                            ->get();
        });

        $listBendahara = GetBendahara::get();
        $listPimpinan = GetPimpinan::get();

        if (strpos(\URL::current(),'create')) {
            $nomor_permohonan = nomor_permohonan_gu($nomor_urut);
            $listSpj = \GetSpj::where('status', '!=', 1)->where('permohonan_id', NULL)->get();
        } else {
            $nomor_permohonan = $permohonan->nomor_permohonan; 
            $listSpj = \GetSpj::where('status', '!=', 1)->where('permohonan_id', NULL)->orWhere('permohonan_id', $id)->get();
        }

        return Resolver(compact(
            'listProgramKegiatan',
            'listBendahara',
            'listPimpinan',
            'nomor_permohonan',
            'jenis',
            'listSpj',
            'permohonan'
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
            'kode_dpa' => 'required',
            'nominal_diajukan' => 'required',
        ]);

        $tahun = tahun();
        $jenis_anggaran = jenis_anggaran();

        if($id){
            $permohonan = PostGantiUang::find($id);
        }else{
            $permohonan = new PostGantiUang;
        }

        $dpa = GetDpa::where('kode_dpa', request()->input('kode_dpa'))
                ->where('tahun', $tahun)
                ->where('jenis_anggaran', $jenis_anggaran)
                ->first();

        Setter('tanggal', request()->input('tanggal'));
        $nomor_permohonan = nomor_permohonan_gu($permohonan->nomor_urut);

        $permohonan->nomor_urut = intval(head(explode('/', $nomor_permohonan)));
        $permohonan->nomor_permohonan = $nomor_permohonan;
        $permohonan->tanggal = request()->input('tanggal'); 
        $permohonan->kode_dpa = request()->input('kode_dpa');
        $permohonan->kegiatan = $dpa->nama;
        $permohonan->nominal_diajukan = request()->input('nominal_diajukan');

        if($id){
            $permohonan->updated_by = auth()->user()->username;
        }else{
            $permohonan->created_by = auth()->user()->username;
        }

        $permohonan->save();

        \PostSpj::updateOrCreate(
            ['id' => request()->input('spj_id')],
            [
                'kode_dpa'          => request()->input('kode_dpa'),
                'nominal_diajukan'  => request()->input('nominal_diajukan'),
                'tanggal'           => request()->input('tanggal'),
                'kegiatan'          => $dpa->nama,
                'permohonan_id'     => GetGantiUang::where('nomor_permohonan', $nomor_permohonan)->value('id'),

            ]
        );

        return Resolver('complete');  
    }

    public function destroy($id)
    {
        $permohonan = PostGantiUang::find($id);

        if($permohonan){
            $permohonan->detail()->delete();
            $permohonan->spj1()->delete();
            $permohonan->delete();
        }

        return Resolver('complete without back');          
    }

    public function aliranKas($id)
    {
        $permohonan = GetGantiUang::find($id);

        $bulan = Carbon::createFromFormat("Y-m-d", $permohonan->tanggal)->format('n');
        $kegiatan = GetDpa::where('tahun', $permohonan->tahun)
                    ->where('jenis_anggaran', $permohonan->jenis_anggaran)
                    ->where('kode_dpa', $permohonan->kode_dpa)
                    ->with('kpa1')->with('pptk1')
                    ->first();

        $bendahara = GetBendahara::where('tahun', $permohonan->tahun)->aktif()->first();

        $dpa = GetDpa::where(function($subquery) use($permohonan){
                    $subquery->where('kode_dpa', 'LIKE', $permohonan->kode_dpa.'.%');
                })->where('tahun', $permohonan->tahun)
                ->where('jenis_anggaran', $permohonan->jenis_anggaran)
                ->whereNotIn('jenis', ['judul', 'rincian'])
                ->get();

        $dpa->each(function($item) use($permohonan, $bulan){
            $queryPermohonan = $permohonan->detail();

            if($item->jenis == 'belanja-5'){
                $item->nominal_permohonan = with(clone $queryPermohonan)->where('kode_rekening', $item->kode_rekening)->sum('nominal_diajukan');
            }else{
                $item->nominal_permohonan = with(clone $queryPermohonan)->where('kode_rekening', 'LIKE', $item->kode_rekening . '.%')->sum('nominal_diajukan');

            }

            $item->aliran_kas = GetKas::where('tahun', $item->tahun)
                                ->where('jenis_anggaran', $item->jenis_anggaran)
                                ->where('kode_dpa', $item->kode_dpa)
                                ->where('kode_rekening', $item->kode_rekening)
                                ->where('bulan', $bulan)
                                ->first();

        });

        $jenis = config('spj.spp.'.$permohonan->jenis);

        return Resolver(compact(
            'permohonan', 'kegiatan', 'bendahara', 'bulan', 'dpa', 'jenis'
        ));
    }

    public function aliranKasSave($id)
    {
        $permohonan = PostGantiUang::find($id);
        $bulan = Carbon::createFromFormat("Y-m-d", $permohonan->tanggal)->format('n'); 

        $kegiatan = GetDpa::where('tahun', $permohonan->tahun)
                    ->where('jenis_anggaran', $permohonan->jenis_anggaran)
                    ->where('kode_dpa', $permohonan->kode_dpa)->first();

        $bendahara = GetBendahara::where('tahun', $permohonan->tahun)->aktif()->first();

        $inserted = [];

        foreach(request()->input('detail', []) as $kode_rekening => $nominal)
        {
            $nominal = numeric($nominal);

            $detail = $permohonan->detail()->firstOrCreate([
                'kode_dpa' => $permohonan->kode_dpa,
                'kode_rekening' => $kode_rekening,
            ]);

            $rincian = GetDpa::where('tahun', $permohonan->tahun)
                        ->where('jenis_anggaran', $permohonan->jenis_anggaran)
                        ->where('kode_dpa', sprintf('%s.%s', $permohonan->kode_dpa, $kode_rekening))
                        ->first();

            $detail->update([
                'uraian' => $rincian->nama,
                'nominal_diajukan' => $nominal
            ]);

            $total_di_ajukan = GetDetail::where([
                'kode_dpa' => $permohonan->kode_dpa,
                'kode_rekening' => $kode_rekening,
            ])
            ->whereHas('permohonan', function($query) use($permohonan, $bulan){
                $query->where('tahun', $permohonan->tahun);
                $query->where('jenis_anggaran', $permohonan->jenis_anggaran);
                $query->whereMonth('tanggal', $bulan);
            })
            ->sum('nominal_diajukan');

            $aliran_kas = GetKas::where('jenis_anggaran', $permohonan->jenis_anggaran)
                            ->where('tahun', $permohonan->tahun)
                            ->where('kode_dpa', sprintf('%s.%s', $permohonan->kode_dpa, $kode_rekening))
                            ->where('kode_rekening', $kode_rekening)
                            ->where('bulan', $bulan)
                            ->update([
                                'diajukan' => $total_di_ajukan
                            ]);

            $inserted[] = $kode_rekening;
        }

        $permohonan->detail()->whereNotIn('kode_rekening', $inserted)->delete();
        $permohonan->nominal_diajukan = $permohonan->detail()->sum('nominal_diajukan');
        $permohonan->save();

        return Resolver('complete');  
    }

    public function daftar($id, $rekening)
    {
        $permohonan = GetGantiUang::with(['detail' => function($detail) use($rekening){
            $detail->where('kode_rekening', $rekening);
        }])->find($id);

        $bulan = (plain_date($permohonan->tanggal)->format('n'));

        $dpa = GetDpa::where('kode_dpa', 'LIKE', $permohonan->kode_dpa . '.%')
            ->where('tahun', $permohonan->tahun)
            ->where('jenis_anggaran', $permohonan->jenis_anggaran)
            ->where('kode_rekening', $rekening)
            ->first();

        $aliran_kas = GetKas::tahun()
            ->where('bulan', $bulan)
            ->where('kode_rekening', $dpa->kode_rekening)
            ->first();

        return Resolver(compact('permohonan', 'dpa', 'rekening', 'aliran_kas', 'bulan'));  
    }

}
