<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use \GetStandarPerjadinHotelDalam as GetDalam;
use \PostStandarPerjadinHotelDalam as PostDalam;

use Carbon\Carbon;

class StandarPerjadinHotelDalamController extends Controller
{
    public function index()
    {
        $hotel = GetDalam::orderBy('id', 'desc')->paginate(20);

        return Resolver(compact('hotel')); 

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
            $hotel = GetDalam::find($id);
        }else{
            $hotel = null;
        }

        return Resolver(compact('hotel'));
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
            'nominal' => 'required',
        ]);

        if($id){
            $hotel = PostDalam::find($id);
        }else{
            $hotel = new PostDalam;
        }

        $hotel->jabatan = request()->input('jabatan');
        $hotel->nominal = numeric(request()->input('nominal'));

        $hotel->save();

        return Resolver('complete');  
    }

    public function destroy($id)
    {
        $hotel = PostDalam::find($id);

        if($hotel){
            $hotel->delete();
        }

        return Resolver('complete without back');  
    }

}
