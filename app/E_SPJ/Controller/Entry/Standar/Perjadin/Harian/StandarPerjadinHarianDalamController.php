<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use \GetStandarPerjadinHarianDalam as GetDalam;
use \PostStandarPerjadinHarianDalam as PostDalam;

use Carbon\Carbon;

class StandarPerjadinHarianDalamController extends Controller
{
    public function index()
    {
        $harian = GetDalam::orderBy('id', 'desc')->paginate(20);

        return Resolver(compact('harian')); 
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
            $harian = GetDalam::find($id);
        }else{
            $harian = null;
        }

        return Resolver(compact('harian'));
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
            'nominal_luar_wilayah' => 'required',
            'nominal_dalam_wilayah' => 'required',
            'nominal_dalam_kota' => 'required',
        ]);

        if($id){
            $harian = PostDalam::find($id);
        }else{
            $harian = new PostDalam;
        }

        $harian->jabatan = request()->input('jabatan');
        $harian->nominal_luar_wilayah = numeric(request()->input('nominal_luar_wilayah'));
        $harian->nominal_dalam_wilayah = numeric(request()->input('nominal_dalam_wilayah'));
        $harian->nominal_dalam_kota = numeric(request()->input('nominal_dalam_kota'));

        $harian->save();

        return Resolver('complete');  
    }

    public function destroy($id)
    {
        $harian = PostDalam::find($id);

        if($harian){
            $harian->delete();
        }
        
        return Resolver('complete without back');  
    }

}
