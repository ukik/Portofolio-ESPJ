<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use \GetStandarPerjadinHotelLuar as GetLuar;
use \GetStandarPerjadinHotelLuarDetail as GetDetail;
use \GetDataDasarLokasi as GetLokasi;

use \PostStandarPerjadinHotelLuar as PostLuar;
use \PostStandarPerjadinHotelLuarDetail as PostDetail;
use \PostDataDasarLokasi as PostLokasi;

use Carbon\Carbon;

class StandarPerjadinHotelLuarController extends Controller
{
    public function index()
    {

        $listLokasi = GetLokasi::whereNull('induk_id')->with('sub')->paginate(10);        

        $hotel = GetLuar::orderBy('jabatan')->get();

        $nomor = 1;
        $nominal = [];

        foreach($hotel as $item){
            $nominal[$item->id] = $item->detail()->pluck('nominal', 'lokasi_id');
        }

        return Resolver(compact('listLokasi', 'hotel', 'nomor', 'nominal'));  
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

        $listLokasi = GetLokasi::whereNull('induk_id')->with('sub')->get();
        
        $hotel = GetLuar::orderBy('jabatan')->get();

        $nominal = [];

        if(!is_null($id)){
            $hotel = GetLuar::with('detail')->find($id);
        }else{
            $hotel = null;

            foreach($listLokasi as $item){
                $nominal[$item->id] = 0;
            }
        }

        $nomor = 1;

        return Resolver(compact('nomor', 'nominal', 'listLokasi'));  
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
            'jabatan' => 'required',
            'nominal' => 'required|array',
        ]);

        if($id){
            $hotel = PostLuar::find($id);
        }else{
            $hotel = new PostLuar;
        }

        $hotel->jabatan = request()->input('jabatan');

        $hotel->save();

        foreach(request()->input('nominal') ?: [] as $lokasi_id => $nominal){
            $detail = new PostDetail;
            $detail->lokasi_id = str_replace("'","",$lokasi_id);
            $detail->nominal = numeric($nominal);

            $hotel->detail()->save($detail);
        }

        return Resolver('complete');  
    }

    public function destroy($id)
    {
        $hotel = PostLuar::find($id);

        if($hotel){
            $hotel->detail()->delete();
            $hotel->delete();
        }

        return Resolver('complete without back');  
    }

}
