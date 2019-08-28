<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class LoginController extends Controller
{

    public function init() {

        $user = \Auth::user();

        if(AuthCheck()) {
            $signiture = Encrypt($user->password); 

            $post = \PostUser::find($user->id);
            
            $post->update([ 'signiture' => $signiture ]);

            $security = [
                    'signiture'         => $signiture,
                    'token'             => JWTRefresh(),
                    'scopes'            => $user->level,
                    'tahun'             => $user->tahun_aktif,
                    'jenis_anggaran'    => $user->anggaran_aktif,    
                    'username'          => $user->username,
                    'bidang'            => $user->bidang->kode_surat,
            ];

        } else {
            $security = 'unauthorized';
        }      

        return response()->json([
                'data'      => 'init',
                'user'      => $post,
                'security'  => $security,
            ])
            ->header('Content-Type', 'application/json')
            // ->header('Content-Type', 'application/x-www-form-urlencoded')
            ->setStatusCode(200);

    }
        
    public function index()
    {

        $listTahun = \GetDataDasarTahun::pluck('tahun');

        $listAnggaran = ['murni' => 'MURNI', 'perubahan' => 'PERUBAHAN'];

        $listBerkas = \GetBerkas::where('aktif', 1)->get();

        $back = false;

        return SimpleResolver(compact('listTahun', 'listAnggaran', 'listBerkas', 'back'));
    }

    // request to download zip
    // zip must be available to download
    // look at folder permission read/write
    public function download($id) {

        return redirect("public/berkas"."/".$id.".zip");

        // below support localhost only, di server deka not working
        $zip = \File::get(public_path()."/berkas"."/".$id.".zip");

        return \Response::make($zip)
            ->header('Content-Type', 'application/x-www-form-urlencoded')
            ->header('Content-Transfer-Encoding', 'binary')
            ->header("Content-Type", "application/zip");

    }

    public function satuan($id)
    {
        $berkas = \GetBerkas::find($id);

        return redirect($berkas->path);
        
        // below support localhost only, di server deka not working
        return response()->download(public_path($berkas->path), $berkas->nama);
    }    

    // compact many files into zip
    // zip cannot be downloaded concurrently
    // must use another request
    // look at folder permission read/write
    public function zip()
    {
        # VERSI 2
        $zip_folder = "berkas";
        $zip_name = time();

        $zip_path = $zip_folder.'/berkas'.".zip"; //$zip_folder.'/'.$zip_name.".zip";

        $file = \GetBerkas::where('aktif', 1)->pluck('path');

        $files = [];
        foreach ($file as $key => $value) {
            array_push($files, public_path($value));
        }

        Zipper::make($zip_path)->add($files);

        return redirect()->route('berkas.download', ['id' => $zip_name]);


        # VERSI 1
        /*
        $files = \GetBerkas::where('aktif', 1)->get();

        $zip = new ZipArchive();
        $zip_name = "berkas/".time().".zip"; // Zip name
        $zip->open($zip_name,  ZipArchive::CREATE);

        foreach ($files as $file) {
            echo $path = "".$file->path;
            if(file_exists($path)){
                $zip->addFromString(basename($path),  file_get_contents($path));  
            }
            else{
                echo"file does not exist";
            }
        }
        $zip->close();
        */
    }    
}
