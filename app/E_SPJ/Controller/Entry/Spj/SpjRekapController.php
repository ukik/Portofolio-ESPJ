<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use \GetSpj as GetSpj;
use \GetPengaturan as GetPengaturan;
use \GetDataDasarDpa as GetDpa;

use \PostSpj as PostSpj;
use \PostPengaturan as PostPengaturan;

class SpjRekapController extends Controller
{
    public function index($spj_id)
    {
        $spj = GetSpj::find($spj_id);
        $rekap = $spj->rekap;

        return Resolver(compact('spj', 'rekap')); 
    }

    public function create($spj_id)
    {
        return $this->form($spj_id);
    }

    public function edit($spj_id, $rekap_id)
    {
        return $this->form($spj_id, $rekap_id);
    }

    public function form($spj_id, $rekap_id = null)
    {
        $spj = GetSpj::find($spj_id);
        $permohonan = $spj->permohonan;

        if(!is_null($rekap_id)){
            $rekap = $spj->rekap()->find($rekap_id);
        }else{
            $rekap = null;
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

        if(old('permohonan_detail_id')){ 
            $permohonan_detail = $permohonan->detail()->find(old('permohonan_detail_id'));
            $nominal_disetujui = $permohonan_detail->nominal_disetujui;
            $nominal_sebelumnya = $spj->rekap()->where('permohonan_detail_id', old('permohonan_detail_id'))->sum('nominal');
            $nominal_sisa = $nominal_disetujui - $nominal_sebelumnya;
        }

        $keys = [
            tahun().'.pajak.ppn',
            tahun().'.pajak.pph21',
            tahun().'.pajak.pph22',
            tahun().'.pajak.pph23',
        ];

        $pajak = GetPengaturan::whereIn('key', $keys)->pluck('value','key'); 

        return Resolver(compact(
            'spj', 
            'permohonan',
            'listKodeRekening',
            'nominal_disetujui',
            'nominal_sebelumnya',
            'nominal_sisa',
            'pajak',
            'rekap'
        ));  
    }

    public function store($spj_id)
    {
        return $this->save($spj_id);
    }

    public function update($spj_id, $rekap_id)
    {
        return $this->save($spj_id, $rekap_id);
    }

    // input ke database tolong di tracking
    public function save($spj_id, $rekap_id = null)
    {
        $this->validate(request(), [
            'id' => 'required',
            'tanggal' => 'required', 
            'permohonan_id' => 'required',
            'permohonan_detail_id' => 'required', 
            'penerima' => 'required', 
            'nominal' => 'required', 
            'kode_dpa' => 'required', 
            'kode_rekening' => 'required', 
            'uraian' => 'required',
            // 'ppn' => 'required', 
            // 'pph21' => 'required', 
            // 'pph22' => 'required', 
            // 'pph23' => 'required', 
        ]);

        $spj = PostSpj::find($spj_id);


        if(is_null($rekap_id)){
            $rekap = $spj->rekap()->create([]);
        }else{
            $rekap = $spj->rekap()->find($rekap_id);
        } 

        $request = request();

        $nominal = $request->nominal == null || $request->nominal == 0 ? 0 : $request->nominal;
        $ppn = $request->ppn == null || $request->ppn == 0 ? 0 : $request->ppn;
        $pph21 = $request->pph21 == null || $request->pph21 == 0 ? 0 : $request->pph21;
        $pph22 = $request->pph22 == null || $request->pph22 == 0 ? 0 : $request->pph22;
        $pph23 = $request->pph23 == null || $request->pph23 == 0 ? 0 : $request->pph23;

        $ppn_nilai = numeric($nominal * $ppn) / 100;
        $pph_21_nilai = numeric($nominal * $pph21) / 100;
        $pph_22_nilai = numeric($nominal * $pph22) / 100;
        $pph_23_nilai = numeric($nominal * $pph23) / 100;
        $jumlah = numeric($nominal - $ppn_nilai + $pph_21_nilai + $pph_22_nilai + $pph_23_nilai);

        $rekap->spj_id = $request->id;
        $rekap->permohonan_id = $request->permohonan_id;
        $rekap->permohonan_detail_id = $request->permohonan_detail_id;
        $rekap->kode_dpa = $request->kode_dpa;
        $rekap->kode_rekening = $request->kode_rekening;
        $rekap->penerima = $request->penerima;
        $rekap->uraian = $request->uraian;
        $rekap->tanggal = $request->tanggal;
        $rekap->nominal = $nominal;
        $rekap->ppn_persen = $ppn;
        $rekap->ppn_nilai = $ppn_nilai == null || $ppn_nilai == 0 ? 0 : $ppn_nilai;
        $rekap->pph_21_persen = $pph21;
        $rekap->pph_21_nilai = $pph_21_nilai == null || $pph_21_nilai == 0 ? 0 : $pph_21_nilai;
        $rekap->pph_22_persen = $pph22;
        $rekap->pph_22_nilai = $pph_22_nilai == null || $pph_22_nilai == 0 ? 0 : $pph_22_nilai;
        $rekap->pph_23_persen = $pph23;
        $rekap->pph_23_nilai = $pph_23_nilai == null || $pph_23_nilai == 0 ? 0 : $pph_23_nilai;
        $rekap->jumlah = $jumlah == null || $jumlah == 0 ? 0 : $jumlah;

        $rekap->save();

        $spj->nominal_spj = $spj->rekap->sum('nominal');
        $spj->nominal_sisa = $spj->nominal_disetujui - $spj->nominal_spj;

        $spj->save();

        return Resolver('complete');  

    }

    public function download($spj_id, $rekap_id, $nama)
    {
        $spj = GetSpj::find($spj_id);
        $rekap = $spj->rekap()->find($rekap_id);

        return Resolver('complete');  
    }

    public function destroy($spj_id, $rekap_id)
    {
        $spj = PostSpj::find($spj_id);
        $rekap = $spj->rekap()->find($rekap_id);
        $rekap->delete();

        $spj->nominal_spj = $spj->rekap->sum('nominal');
        $spj->nominal_sisa = $spj->nominal_disetujui - $spj->nominal_spj;

        $spj->save();

        return Resolver('complete without back');  
    }
}
