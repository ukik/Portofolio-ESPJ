<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use \GetLampiranPerjadin as GetPerjadin;
use \GetLampiranPerjadinDetail as GetDetail;
use \GetLampiranPerjadinBiaya as GetBiaya;
use \GetDataDasarPegawai as GetPegawai;

use \PostLampiranPerjadin as PostPerjadin;
use \PostLampiranPerjadinDetail as PostDetail;
use \PostLampiranPerjadinBiaya as PostBiaya;
use \PostDataDasarPegawai as PostPegawai;

use Carbon\Carbon;

use App\Lampiran\Perjadin;

class LampiranPerjadinDetailController extends Controller
{
    public function index($id)
    {        

        $perjadin = GetPerjadin::with('pptk')
            ->with('kpa')
            ->with('bendahara')
            ->with('pimpinan')
            ->find($id);

        $perjadin_detail = GetDetail::where('perjadin_id', $id)->get();

        return Resolver(compact('perjadin', 'perjadin_detail'));
    }

    public function create($id)
    {
        return $this->form($id);
    }

    public function edit($perjadin_id, $id)
    {

        return $this->form($perjadin_id, $id);
    }

    public function form($perjadin_id, $id = null)
    {

        if(!is_null($id)) {
            $perjadin_detail = GetDetail::find($id);
        }else{
            $perjadin_detail = null;
        }

        $perjadin = GetPerjadin::find($perjadin_id);

        $exceptPegawai = $perjadin->detail()->where(function($query) use($perjadin_detail){
            if($perjadin_detail){
                $query->whereNotIn('pegawai_id', [$perjadin_detail->pegawai_id]);
            }
        })->pluck('pegawai_id');

        $listPegawai = GetPegawai::whereNotIn('id', $exceptPegawai)->get();

        if(old('pegawai_id')){
            $pegawai = GetPegawai::find(old('pegawai_id'));

            $limit = intval(pengaturan(tahun().'.perjadin.limit', 20));

            $bulan = plain_date($perjadin->tanggal_berangkat)->format('n');
            $check = GetPerjadin::selectRaw('MIN(tanggal_berangkat) as tanggal_berangkat, MAX(tanggal_kembali) as tanggal_kembali')
                    ->whereMonth('tanggal_berangkat', $bulan)->whereHas('detail.pegawai', function($query) use($pegawai){
                        $query->where('pegawai_id', $pegawai->id);
                    })->first();

            if($check->tanggal_berangkat && $check->tanggal_kembali){
                $days = (plain_date($check->tanggal_berangkat)->diffInDays(plain_date($check->tanggal_kembali)));
            }else{
                $days = 0;
            }

            if($days > $limit){
                $kunci = true;
            }else{
                $kunci = false;
            }
        }

        return Resolver(compact('listPegawai', 'perjadin_id', 'perjadin_detail')); 
    }

    public function store($perjadin_id)
    {
 
        return $this->save($perjadin_id);
    }

    public function update($perjadin_id, $id)
    {

        return $this->save($perjadin_id, $id);
    }

    public function save($perjadin_id, $id = null)
    {
        $this->validate(request(), [
            'pegawai_id' => 'required',
        ]);

        if($id) {
            $perjadin_detail = PostDetail::find($id);
        }else{
            $perjadin_detail = new PostDetail;
        }

        $pegawai = GetPegawai::where('id', request()->input('pegawai_id'))->first();

        $perjadin = GetPerjadin::find($perjadin_id);

        $perjadin_detail->perjadin_id = $perjadin_id;
        $perjadin_detail->pegawai_id = request()->input('pegawai_id');
        $perjadin_detail->pegawai_nama = $pegawai->nama_lengkap;
        $perjadin_detail->pegawai_nip = $pegawai->nip;
        $perjadin_detail->pegawai_singkatan = $pegawai->singkatan;

        $perjadin_detail->save();

        return Resolver('complete');  
    }

    public function destroy($perjadin_id, $id)
    {
 
        $detail = PostDetail::find($id);

        if($detail) {
            $detail->delete();
        }

        return Resolver('complete without back');
    }

    public function print($perjadin_id, $id)
    {
        $detail = GetDetail::where('id', $id)->first();
        $perjadin = PostPerjadin::where('id', $perjadin_id)->first();

        if(blank($perjadin->printed_at)){
            $perjadin->printed_at = now();
        }
        $perjadin->printed_by = auth()->user()->username;

        $perjadin->save();

        $jenis = request()->get('jenis');

        if(!in_array($jenis, ['kuitansi', 'rincian'])){
            $jenis = 'kuitansi';
        }

        return view('lampiran.perjadin.detail.print.' . $jenis, compact('perjadin', 'detail'));

    }

    public function biaya($perjadin_id, $id)
    {

        $detail = GetDetail::find($id);
        $biaya = $detail->biaya()->get();

        $perjadin = GetPerjadin::find($perjadin_id);
        $pegawai = $detail->pegawai;

        $lunsum = pengaturan(tahun().'.perjadin.'.str_slug($pegawai->golongan));

        if($biaya->count() <= 0){
            foreach(config('spj.perjadin.biaya', []) as $urut => $item){
                $item['urut'] = $urut + 1;
                $item['perjadin_id'] = $perjadin_id;
                $item['perjadin_detail_id'] = $id;
                if(str_is('*lunsum*', $item['rincian'])){
                    $item['volume'] = $perjadin->lama_perjalanan;
                    $item['harga'] = doubleval($lunsum);
                }
                $item['jumlah'] = $item['harga'] * $item['volume'];
                PostBiaya::create($item);
            }

            $biaya = $detail->biaya()->get();
        }

        return Resolver(compact('perjadin', 'detail', 'biaya'));
    }

    public function biayaCreate($perjadin_id, $id)
    {
        $detail = PostDetail::find($id);
        $perjadin = GetPerjadin::find($perjadin_id);
        $pegawai = $detail->pegawai;

        $biaya = new PostBiaya;
        $biaya->perjadin_id = $perjadin_id;
        $biaya->volume = 0;
        $biaya->satuan = 'Perjalanan';
        $biaya->harga = 0;
        $biaya->jumlah = 0;

        PostBiaya::save($biaya);

        return Resolver('complete');  
    }

    public function biayaSave($perjadin_id, $id)
    {
        $detail = PostDetail::find($id);
        $perjadin = PostPerjadin::find($perjadin_id);
        $pegawai = $detail->pegawai;

        foreach(request()->input('rincian', []) as $biaya_id => $rincian){
            $biaya = $detail->biaya()->find($biaya_id);
            $biaya->rincian = $rincian;
            $biaya->volume = doubleval(numeric(request()->input('volume.' . $biaya_id)));
            $biaya->satuan = request()->input('satuan.' . $biaya_id);
            $biaya->harga = doubleval(numeric(request()->input('harga.' . $biaya_id)));
            $biaya->jumlah = $biaya->volume * $biaya->harga;
            $biaya->keterangan = request()->input('keterangan.' . $biaya_id);
            $biaya->save();
        }

        $detail->nominal = $detail->biaya()->sum('jumlah');
        $detail->save();

        $perjadin->nominal = $perjadin->detail()->sum('nominal');
        $perjadin->save();

        return Resolver('complete');  
    }

    public function biayaDestroy($perjadin_id, $detail_id, $biaya_id)
    {
        $detail = GetDetail::find($detail_id);
        $perjadin = GetPerjadin::find($perjadin_id);
        $pegawai = $detail->pegawai;

        $biaya = PostBiaya::find($biaya_id);

        if($biaya) {
            $biaya->delete();
        }

        return Resolver('complete without back'); 
    }
}
