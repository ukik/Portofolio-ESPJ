<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use \GetStandarHonor as GetHonor;
use \PostStandarHonor as PostHonor;

use Carbon\Carbon;

class StandarHonorController extends Controller
{
    public function index()
    {
        $honor = GetHonor::orderBy('id', 'desc')->paginate(20);

        return Resolver(compact('honor')); 
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
            $honor = GetHonor::find($id);
        }else{
            $honor = null;
        }

        return Resolver(compact('honor'));
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
            'golongan' => 'required',
        ]);

        if($id){
            $honor = PostHonor::find($id);
        }else{
            $honor = new PostHonor;
        }

        $honor->tahun = tahun();
        $honor->golongan = request()->input('golongan');
        $honor->label = config('spj.golongan.' . $honor->golongan);
        $honor->nominal = numeric(request()->input('nominal'));

        $honor->save();

        return Resolver('complete'); 
    }

    public function destroy($id)
    {
        $honor = PostHonor::find($id);

        if($honor){
            $honor->delete();
        }
        
        return Resolver('complete without back');  
    }

}
