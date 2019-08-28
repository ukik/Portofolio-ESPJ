<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use \GetStandarPerjadinRepresentatif as GetRepresentatif;
use \PostStandarPerjadinRepresentatif as PostRepresentatif;

use Carbon\Carbon;

class StandarPerjadinRepresentatifController extends Controller
{
    public function index()
    {
        $representatif = GetRepresentatif::orderBy('id', 'desc')->paginate(20);

        return Resolver(compact('representatif'));
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
            $representatif = GetRepresentatif::find($id);
        }else{
            $representatif = null;
        }

        return Resolver(compact('representatif'));
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
        ]);

        if($id){
            $representatif = PostRepresentatif::find($id);
        }else{
            $representatif = new PostRepresentatif;
        }

        $representatif->jabatan = request()->input('jabatan');
        $representatif->nominal_luar_wilayah = numeric(request()->input('nominal_luar_wilayah'));
        $representatif->nominal_dalam_wilayah = numeric(request()->input('nominal_dalam_wilayah'));

        $representatif->save();

        return Resolver('complete');  
    }

    public function destroy($id)
    {
        $representatif = PostRepresentatif::find($id);

        if($representatif){
            $representatif->delete();
        }

        return Resolver('complete without back');  
    }

}
