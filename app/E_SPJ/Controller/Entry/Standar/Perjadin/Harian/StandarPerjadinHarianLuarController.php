<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use \GetStandarPerjadinHarianLuar as GetLuar;
use \GetDataDasarLokasi as GetLokasi;
use \GetDataDasarLokasiLuarNegeri as GetLuarNegeri;

use \PostStandarPerjadinHarianLuar as PostLuar;
use \PostDataDasarLokasi as PostLokasi;
use \PostDataDasarLokasiLuarNegeri as PostLuarNegeri;
use \PostStandarPerjadinHarianLuarDetail as PostDetail;

use Carbon\Carbon;

class StandarPerjadinHarianLuarController extends Controller
{
    public function index()
    {

        $listLokasi = GetLuarNegeri::whereNull('induk_id')
            ->with(['sub' => function($query){
                return $query->with('nominal')->get();
            }])
            ->paginate(10); # api versi 2

        $harian = GetLuar::orderBy('jabatan')->get();
        $nomor = 1; 

        $nominal = [];
        foreach($harian as $item){
            $nominal[$item->id] = $item->detail()->pluck('nominal', 'lokasi_ln_id');
        }

        return Resolver(compact('listLokasi', 'harian', 'nomor', 'nominal')); 
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
        $listLokasi = GetLuarNegeri::get();

        $nominal = [];
        if(!is_null($id)){
            $harian = GetLuar::find($id);

            foreach($listLokasi as $item){
                foreach($item->sub as $subitem){
                    $nominal[$subitem->id] = $harian->detail()->where('lokasi_ln_id', $subitem->id)->value('nominal');
                }
            }

        }else{
            $harian = null;

            foreach($listLokasi as $item){
                foreach($item->sub as $subitem){
                    $nominal[$subitem->id] = 0;
                }
            }
        }

        $nomor = 1;

        return Resolver(compact('nomor', 'nominal', 'listLokasi', 'harian'));
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
            $harian = PostLuar::find($id);
        }else{
            $harian = new PostLuar;
        }

        $harian->jabatan = request()->input('jabatan');

        $harian->save();

        foreach(request()->input('nominal') ?: [] as $lokasi_ln_id => $nominal){
            $detail = new PostDetail;
            $detail->lokasi_ln_id = str_replace("'","",$lokasi_ln_id);
            $detail->nominal = numeric($nominal);

            $harian->detail()->save($detail);
        }

        return Resolver('complete');  
    }

    public function destroy($id)
    {
        $harian = PostLuar::find($id);

        if($harian){
            $harian->detail()->delete();
            $harian->delete();
        }

        return Resolver('complete without back');  
    }

}
