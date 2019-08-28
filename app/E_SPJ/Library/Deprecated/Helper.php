<?php

// use Riskihajar\Terbilang\Facades\Terbilang;
use Carbon\Carbon;
// use App\DataDasar;
// use App\Pengaturan;
// use App\Permohonan\GantiUang;
// use App\Lampiran\Spk;
// use App\Lampiran\Perjadin;

if(!function_exists('rp')) {
    function rp($nominal, $prefix='', $suffix='', $decimal=0, $presisi=',', $separator='.')
    {
        return $prefix . number_format($nominal, $decimal, $presisi, $separator) . $suffix;
    }
}

if(!function_exists('persen')) {
    function persen($nominal, $prefix='', $suffix='', $decimal=2, $presisi=',', $separator='.')
    {
        return $prefix . number_format($nominal, $decimal, $presisi, $separator) . $suffix;
    }
}

if(!function_exists('numeric')) {
    function numeric($string, $cleans=[])
    {
        $result = 0;

        $result = str_replace(',', '', $string);
        $result = str_replace($cleans, '', $result);

        return doubleval($result);
    }
}

if(!function_exists('terbilang')) {
    function terbilang($nominal, $suffix=' rupiah', $prefix='')
    {
        // return ucfirst(Terbilang::make($nominal, $suffix, $prefix));
    }
}

if(!function_exists('roman')) {
    function roman($number, $lowercase = false)
    {
        // return Terbilang::roman($number, $lowercase);
    }
}

if( ! function_exists('assets') ){
    function assets($lists=[], $type='style')
    {
        $assets = [];
        $template = [
            'style' => '<link rel="stylesheet" href="%s">',
            'script' => '<script src="%s"></script>'
        ];
        foreach( (array) $lists as $src){
            if(env('APP_DEBUG')){
                $version = env('ASSET_VERSION', date('ymdhis'));
                $src .= (str_is('*?*', $src) ? "&" : '?') . 'version=' . $version;
            }

            $assets[] = sprintf($template[$type], asset($src));
        }

        return implode("\n", $assets);
    }
}

if( ! function_exists('style') ){
    function style($lists){
        return assets($lists, 'style');
    }
}

if( ! function_exists('script') ){
    function script($lists){
        return assets($lists, 'script');
    }
}

if( ! function_exists('build_url') ){
    function build_url($appends=[], $only='*', $except=null)
    {
        $vars = request()->except('_token');
        if(is_array($only)) $vars = request()->only($only);
        if(is_array($except)){
            array_push($except, '_token');
            $vars = request()->except($except);
        }

        $vars = array_filter(array_merge($vars, $appends));

        return http_build_query($vars);
    }
}

if( ! function_exists('active_link') ){
    function active_link($key)
    {
        $result = [];
        if(is_array($key)){
            foreach($key as $i){
                $result[] = str_is($i, request()->url());
            }
        }else{
            $result[] = str_is($key, request()->url());
        }

        return in_array(true, $result) ? 'active' : '';
    }
}

if( ! function_exists('is_super_admin') ){
    function is_super_admin($user=null)
    {
        if(!$user){
            $user = \Auth::user();
        }

        if(!$user){
            return false;
        }else{
            return in_array(object_get($user, 'level'), ['Super', 'Super Admin']);
        }
    }
}

if( ! function_exists('is_admin') ){
    function is_admin($user=null)
    {
        if(!$user){
            $user = \Auth::user();
        }

        if(!$user){
            return false;
        }else{
            return in_array(object_get($user, 'level'), ['Admin', 'Super', 'Super Admin']);
        }
    }
}

if( ! function_exists('is_operator') ){
    function is_operator($user=null)
    {
        if(!$user){
            $user = \Auth::user();
        }
        if(!$user){
            return false;
        }else{
            return in_array(object_get($user, 'level'), ['Operator', 'Satker']);
        }
    }
}

if( ! function_exists('is_verifikator') ){
    function is_verifikator($user=null)
    {
        if(!$user){
            $user = \Auth::user();
        }
        if(!$user){
            return false;
        }else{
            return in_array(object_get($user, 'level'), ['Verifikator']);
        }
    }
}

if( ! function_exists('jenis_anggaran') ){
    function jenis_anggaran()
    {
        return Getter('anggaran') ?: 'murni'; 
    }
}

if( ! function_exists('pengaturan') ){
    function pengaturan($key, $default=null)
    {
        return \GetPengaturan::where('key', $key)->value('value') ?: $default;
    }
}

if( ! function_exists('date_indo') ){
    function date_indo($date)
    {
        if(blank($date)){
            return null;
        }

        Carbon::setLocale('id');

        $date = Carbon::parse($date);

        $l     = $date->format('l');
        $day   = $date->format('d');
        $month = $date->format('n');
        $year  = $date->format('Y');

        $l = Lang::get('date.day.' . $l).',';
        $month = Lang::get('date.month.' . $month);

        return sprintf('%02d %s %d', $day, $month, $year);
    }
}

if( ! function_exists('plain_date') ){
    function plain_date($date, $format='Y-m-d')
    {
        if(filled($date)){
            return Carbon::createFromFormat($format, $date);
        }else{
            return null;
        }
    }
}

if( ! function_exists('table_row_number') ){
    function table_row_number($paginate, $index)
    {
    	return $index+1+(($paginate->currentPage()-1)*$paginate->perPage());
    }
}

if( ! function_exists('method') ){
    function method($method)
    {
        return '<input type="hidden" name="_method" value="'.$method.'" />';
    }
}

if( ! function_exists('nomor_permohonan_gu') ){
    function nomor_permohonan_gu($nomor_last = null)
    {
        $jenis = config('spj.spp.' . request()->get('jenis', 'gu'));
        $tahun = tahun();
        $jenis_anggaran = jenis_anggaran();

        $kode_dpa = request()->input('kode_dpa');

        if(blank($nomor_last)){
            $nomor_last = intval(\GetPermohonanGantiUang::where('tahun', $tahun)
                        ->orderBy('id', 'DESC')
                        ->value('id')) + 1;
        }

        if(filled($kode_dpa) && blank($nomor_last)){
            $nomor_last = intval(\GetPermohonanGantiUang::where('tahun', $tahun)
                        ->where('kode_dpa', $kode_dpa)
                        ->orderBy('id', 'DESC')
                        ->value('id')) + 1;
        }

        $nomor_permohonan = pengaturan($tahun.'.surat.permohonan');
        if(filled($nomor_last)){
            $nomor_permohonan = str_replace('{nomor}', $nomor_last, $nomor_permohonan);
        }

        if(filled($kode_dpa)){
            $bulan = Carbon::createFromFormat('Y-m-d', Getter('tanggal'))->format('n');
        }else{
            $bulan = Carbon::now()->format('n');
        }

        $bulan_roman = $bulan; 
        $nomor_permohonan = str_replace('{bulan}', $bulan_roman, $nomor_permohonan);

        if(filled($kode_dpa)){
            $dpa = \GetDataDasarDpa::where('kode_dpa', $kode_dpa)
                ->where('jenis_anggaran', jenis_anggaran())
                ->where('tahun', $tahun)->first();
            if(filled($dpa->kode_surat)){
                $nomor_permohonan = str_replace('{kode}', $dpa->kode_surat, $nomor_permohonan);
            }
        }

        return $nomor_permohonan = str_replace('{jenis}', $jenis['kode'], $nomor_permohonan);
    }
}

if( ! function_exists('nomor_spk') ){
    function nomor_spk($nomor_last = null)
    {
        $tahun = tahun();

        $kode_dpa = request()->input('kode_dpa'); 

        if(blank($nomor_last)){

            $nomor_last = intval(\GetLampiranSpk::where('tahun', $tahun)
                        ->orderBy('id', 'DESC')
                        ->value('id')) + 1;                
        }

        if(filled($kode_dpa) && blank($nomor_last)){
            $nomor_last = intval(\GetLampiranSpk::where('tahun', $tahun)
                        ->where('kode_dpa', $kode_dpa)
                        ->orderBy('id', 'DESC')
                        ->value('id')) + 1;                   
        }

        $nomor_spk = pengaturan($tahun.'.surat.spk');
        $nomor_spk = str_replace('{nomor}', $nomor_last, $nomor_spk);

        if(filled($kode_dpa)){
            $dpa = \GetDataDasarDpa::where('kode_dpa', $kode_dpa)
                ->where('jenis_anggaran', jenis_anggaran())
                ->where('tahun', $tahun)->first();
            if(filled($dpa->kode_surat)){
                $nomor_spk = str_replace('{kode}', $dpa->kode_surat, $nomor_spk);
            }
        }

        return $nomor_spk;
    }
}

if( ! function_exists('nomor_spt') ){
    function nomor_spt($nomor_last = null)
    {
        $tahun = tahun();

        $kode_dpa =  request()->input('kode_dpa');

        if(blank($nomor_last)){
            $nomor_last = intval(\GetLampiranPerjadin::where('tahun', $tahun)
                        ->orderBy('id', 'DESC')
                        ->value('id')) + 1;            
        }

        if(filled($kode_dpa) && blank($nomor_last)){

            $nomor_last = intval(\GetLampiranPerjadin::where('tahun', $tahun)
                        ->where('kode_dpa', $kode_dpa)
                        ->orderBy('id', 'DESC')
                        ->value('id')) + 1;            
        }

        $nomor_spt = pengaturan($tahun.'.surat.spt');
        $nomor_spt = str_replace('{nomor}', $nomor_last, $nomor_spt);

        if(filled($kode_dpa)){
            $dpa = \GetDataDasarDpa::where('kode_dpa', $kode_dpa)
                ->where('jenis_anggaran', jenis_anggaran())
                ->where('tahun', $tahun)->first();
            if(filled($dpa->kode_surat)){
                $nomor_spt = str_replace('{kode}', $dpa->kode_surat, $nomor_spt);
            }
        }

        return $nomor_spt;
    }
}

function getSqlWithBinding($sql, $bindDataArr){
    foreach($bindDataArr as $binding) {
        $value = is_numeric($binding) ? $binding : "'".$binding."'";
        $sql = preg_replace('/\?/', $value, $sql, 1);
    }
    return $sql;
} // usage example: $this->getSqlWithBinding($dpa->toSql(),$dpa->getBindings());