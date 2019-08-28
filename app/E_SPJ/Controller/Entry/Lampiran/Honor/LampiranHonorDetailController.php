<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use \GetLampiranHonor as GetHonor;
use \GetLampiranHonorDetail as GetDetail;
use \GetPengaturan as GetPengaturan;
use \GetStandarHonor as GetStandarHonor;
use \GetDataDasarPegawai as GetPegawai;

use \PostLampiranHonor as PostHonor;
use \PostLampiranHonorDetail as PostDetail;
use \PostPengaturan as PostPengaturan;
use \PostStandarHonor as PostStandarHonor;
use \PostDataDasarPegawai as PostPegawai;


use Carbon\Carbon;

class LampiranHonorDetailController extends Controller
{
    public function index($id)
    {
        $honor = GetHonor::where('id', $id)->first();
        $honor_detail = GetDetail::where('honor_id', $honor->id)->get();

        return Resolver(compact('honor', 'honor_detail'));
    }

    public function create($id)
    {
        return $this->form($id);
    }

    public function edit($honor_id, $id)
    {
        return $this->form($honor_id, $id);
    }

    public function form($honor_id, $id = null)
    {
        if(!is_null($id)) {
            $honor_detail = GetDetail::find($id);
        }else{
            $honor_detail = null;
        }

        $honor = GetHonor::find($honor_id);

        $exceptPegawai = $honor->detail()->where(function($query) use($honor_detail){
            if($honor_detail){
                $query->whereNotIn('pegawai_id', [$honor_detail->pegawai_id]);
            }
        })->pluck('pegawai_id');

        $listPegawai = GetPegawai::whereNotIn('id', $exceptPegawai)->where('jenis', $honor->jenis)->get();

        if(old('pegawai_id')){
            $pegawai = GetPegawai::find(old('pegawai_id'));

            // Check Limit Penerimaan Honor
            $bulan = plain_date($honor->tanggal)->format('n');
            $limit = intval(pengaturan(tahun().'.honor.limit', 4));
            $check = GetHonor::whereMonth('tanggal', $bulan)->whereHas('detail.pegawai', function($query) use($pegawai){
                $query->where('pegawai_id', $pegawai->id);
            })->count();

            if($check >= $limit){
                $kunci = true;
            }else{
                $kunci = false;
            }

            // Default Nominal Honor dari Pengaturan
            $defaultHonor = GetStandarHonor::where('golongan', $pegawai->golongan)->value('nominal');
        }

        $listPegawai = GetPegawai::get();

        return Resolver(compact('listPegawai', 'honor_id', 'honor_detail')); 
    }

    public function store($honor_id)
    {
        return $this->save($honor_id);
    }

    public function update($honor_id, $id)
    {
        return $this->save($honor_id, $id);
    }

    public function save($honor_id, $id = null)
    {
        $this->validate(request(), [
            'pegawai_id' => 'required',
            'satuan' => 'required',
            'jumlah' => 'required',
            'volume' => 'required',
        ], [], [
            'volume' => 'Honor'
        ]);

        if($id) {
            $honor_detail = PostDetail::find($id);
        }else{
            $honor_detail = new PostDetail;
        }

        $pegawai = GetPegawai::where('id', request()->input('pegawai_id'))->first();
        $pph_21 = pengaturan(tahun().'.pajak.pph21.'.str_slug($pegawai->golongan), 0);
        $pph_22 = pengaturan(tahun().'.pajak.pph22', 0);
        $pph_23 = pengaturan(tahun().'.pajak.pph23', 0);

        $pph_21 = doubleval($pph_21);
        $pph_22 = doubleval($pph_22);
        $pph_23 = doubleval($pph_23);

        $honor = GetHonor::find($honor_id);

        $honor_detail->honor_id = $honor_id;
        $honor_detail->pegawai_id = request()->input('pegawai_id');
        $honor_detail->pegawai_nama = $pegawai->nama;
        $honor_detail->jabatan_id = data_get($pegawai->jabatan, 'id');
        $honor_detail->jabatan_nama = data_get($pegawai->jabatan, 'nama');
        $honor_detail->jabatan_struktural = $pegawai->jabatan_struktural;
        $honor_detail->satuan = request()->input('satuan') ?: 'Bulan';
        $honor_detail->volume = numeric(request()->input('volume'));
        $honor_detail->jumlah = request()->input('jumlah') ?: 1;
        $honor_detail->subtotal = $honor_detail->jumlah * $honor_detail->volume;
        $honor_detail->pph_21_persen = $pph_21;
        $honor_detail->pph_21_nilai = ($honor_detail->volume * $pph_21)/100;
        $honor_detail->pph_22_persen = $pph_22;
        $honor_detail->pph_22_nilai = ($honor_detail->volume * $pph_22)/100;
        $honor_detail->pph_23_persen = $pph_23;
        $honor_detail->pph_23_nilai = ($honor_detail->volume * $pph_23)/100;
        $honor_detail->total = $honor_detail->subtotal - ($honor_detail->pph_21_nilai + $honor_detail->pph_22_nilai + $honor_detail->pph_23_nilai);

        if($id){
            $honor->updated_by = auth()->user()->username;
        }else{
            $honor->created_by = auth()->user()->username;
        }

        $honor_detail->save();

        $subtotal = $honor->detail()->sum('subtotal');
        $pph_21 = $honor->detail()->sum('pph_21_nilai');
        $pph_22 = $honor->detail()->sum('pph_22_nilai');
        $pph_23 = $honor->detail()->sum('pph_23_nilai');
        $total = $honor->detail()->sum('total');

        $honor->subtotal = $subtotal;
        $honor->pph_21 = $pph_21;
        $honor->pph_22 = $pph_22;
        $honor->pph_23 = $pph_23;
        $honor->total = $total;
        $honor->save();

        return Resolver('complete');     
    }

    public function destroy($honor_id, $id)
    {
        $detail = PostDetail::find($id);

        if($detail) {
            $detail->delete();
        }

        return Resolver('complete without back');      
    }

    public function print($honor_id, $id)
    {
        $detail = GetDetail::where('id', $id)->first();
        $honor = PostHonor::where('id', $honor_id)->first();

        if(blank($honor->printed_at)){
            $honor->printed_at = now();
        }
        $honor->printed_by = auth()->user()->username;

        $honor->save();

        return view('lampiran.honor.detail.print', compact('honor', 'detail'));
        return Resolver(compact('honor', 'detail'));

    }
}
