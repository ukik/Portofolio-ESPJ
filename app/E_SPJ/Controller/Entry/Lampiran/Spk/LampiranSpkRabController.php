<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use \GetLampiranSpk as GetSpk;
use \GetLampiranSpkRab as GetRab;
use \GetLampiranSpkRabDetail as GetDetail;

use \PostLampiranSpk as PostSpk;
use \PostLampiranSpkRab as PostRab;
use \PostLampiranSpkRabDetail as PostDetail;

class LampiranSpkRabController extends Controller
{
    public function index($spk_id)
    {
        $spk = GetSpk::find($spk_id);

        $rab = $spk->rab()->firstOrCreate([]);
        $detail = $rab->detail()->orderBy('tanggal')->get();

        if(!request()->filled('tanggal')){
            foreach($detail as $item){
                if(filled($item->tanggal)){
                    return redirect()->route('lmpr::spk.rab.index', [
                        'spk' => $spk->id,
                        'permohonan' => data_get($spk, 'lampiran.id'),
                        'rekening' => $spk->kode_rekening,
                        'tanggal' => 'true'
                    ]);
                }
            }
        }

        return Resolver(compact('rab', 'detail', 'spk'));
    }

    public function create($spk_id)
    {
        $spk = PostSpk::where('id', $spk_id)->first();

        $rab = $spk->rab()->firstOrCreate([]);
        $detail = $rab->detail()->create([]);

        return Resolver('complete');  
    }

    public function update($spk_id)
    {
        $rab_id = PostSpk::find($spk_id)->rab->spk_id; 

        $spk = PostSpk::find($spk_id);
        $rab = $spk->rab;

        foreach(request()->input('uraian', []) as $id => $uraian){

            $detail = $rab->detail->find($id);

            if($detail) {

                $detail->uraian = $uraian;
                $detail->tanggal = request()->input('tanggal.' . $id); 
                $detail->volume = request()->input('volume.' . $id);
                $detail->satuan = request()->input('satuan.' . $id);
                $detail->harga = request()->input('harga.' . $id);

                $detail->jumlah = doubleval($detail->volume) * doubleval($detail->harga);

                $detail->save();

            } else  {
                $spk_detail = new PostDetail; 

                $spk_detail->spk_rab_id = $rab->spk_id;
                $spk_detail->uraian = $uraian;
                $spk_detail->tanggal = request()->input('tanggal.' . $id); 
                $spk_detail->volume = request()->input('volume.' . $id);
                $spk_detail->satuan = request()->input('satuan.' . $id);
                $spk_detail->harga = request()->input('harga.' . $id);
                $spk_detail->jumlah = doubleval($spk_detail->volume) * doubleval($spk_detail->harga);

                $spk_detail->save();

            }

        }

        $rab->subtotal = $rab->detail()->sum('jumlah');
        $rab->ppn = $rab->subtotal * 0.1; // 10%
        $rab->total = $rab->subtotal + $rab->ppn;
        $rab->save();

        $spk = $rab->spk;

        return Resolver('complete');  
    }

    public function destroy($id)
    {
        $detail = PostDetail::find($id);

        if($detail){
            $rab = $detail->rab;
            $spk = $rab->spk;
            $detail->delete();
        }
        
        return Resolver('complete without back');
    }

    public function print()
    {

    }

}
