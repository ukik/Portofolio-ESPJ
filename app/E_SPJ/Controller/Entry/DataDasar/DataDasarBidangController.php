<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use \GetDataDasarBidang as GetBidang;
use \PostDataDasarBidang as PostBidang;

use Illuminate\Support\Facades\Validator;

class DataDasarBidangController extends Controller
{
    public function index()
    {
        $bidang = GetBidang::whereNull('induk_id')
            ->with('sub')
            ->orderBy('id', 'desc')
            ->get();

        return Resolver(compact('bidang'));        
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
            $bidang = GetBidang::find($id);
        }else{
            $bidang = null;
        }

        $induk = GetBidang::find(request()->input('induk'));

        return Resolver(compact('induk', 'bidang'));
    }

    public function store(Request $request)
    {
        return $this->save($request);
    }

    public function update(Request $request, $id)
    {
        return $this->save($request, $id);
    }

    public function save($request, $id = null)
    {

        $validator = Validator::make($request->all(), [
            'nama' => 'required',
            'singkatan' => 'required',
            'kode_surat' => 'required',
        ]);

        if ($validator->fails()) {
            $message = $validator->messages()->first();
            $status = "validation";
            return Resolver(compact('message','status'));
        }        

        if($id){
            $bidang = PostBidang::find($id);
        }else{
            $bidang = new PostBidang;
        }

        $bidang->nama = request()->input('nama');
        $bidang->singkatan = request()->input('singkatan');
        $bidang->kode_surat = request()->input('kode_surat');

        if(!is_null(request()->has('induk'))){
            $bidang->induk_id = request()->input('induk');
        }

        $bidang->save();

        return Resolver('complete');
    }

    public function destroy($id)
    {
        $bidang = PostBidang::find($id);

        if($bidang){
            $bidang->delete();
        }

        return Resolver('complete without back');        
    }
}
