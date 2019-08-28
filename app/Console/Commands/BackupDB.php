<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Carbon\Carbon;

class BackupDB extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'backup:db';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Full Backup Database';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        /* Remove Last Week Backup */
        $lastWeek = Carbon::now()->subWeek()->format('Y-m-d');
        $path = public_path('backup-db/*' . $lastWeek . '*');
        $listFile = glob($path);
        foreach($listFile as $file){
            @unlink($file);
        }

        $filename = 'backup-db/e-spj-' . date('Y-m-d-H-i') . '.sql';
        \Spatie\DbDumper\Databases\MySql::create()
            ->setDbName(env('DB_DATABASE'))
            ->setUserName(env('DB_USERNAME'))
            ->setPassword(env('DB_PASSWORD'))
            ->includeTables($this->tables())
            ->dumpToFile(public_path($filename));

        $zipper = new \Chumper\Zipper\Zipper;
        $zipper->make(public_path($filename).'.zip')->add(public_path($filename))->close();
        unlink(public_path($filename));

        $this->output->writeln("<info>Full Backup Database :</info> " . $filename . '.zip');
    }

    public function tables()
    {
        return [
            'activity_log',
            'berkas',
            'data_bendahara',
            'data_bidang',
            'data_dpa',
            'data_kas',
            'data_kpa',
            'data_lokasi',
            'data_lokasi_ln',
            'data_pegawai',
            'data_pegawai_standar',
            'data_penghubung',
            'data_pimpinan',
            'data_ppk',
            'data_pptk',
            'data_rekanan',
            'data_tahun',
            'lampiran_honor',
            'lampiran_honor_detail',
            'lampiran_perjadin',
            'lampiran_perjadin_biaya',
            'lampiran_perjadin_detail',
            'lampiran_perubahan',
            'lampiran_perubahan_berkas',
            'lampiran_spk',
            'lampiran_spk_rab',
            'lampiran_spk_rab_detail',
            'migrations',
            'pengaturan',
            'pengumuman',
            'permohonan_gu',
            'permohonan_gu_detail',
            'permohonan_ls',
            'permohonan_tu',
            'permohonan_tu_detail',
            'permohonan_up',
            'spj',
            'spj_berkas',
            'spj_rekap',
            'standar_honor',
            'standar_perjadin_harian_dalam',
            'standar_perjadin_harian_luar',
            'standar_perjadin_harian_luar_detail',
            'standar_perjadin_hotel_dalam',
            'standar_perjadin_hotel_luar',
            'standar_perjadin_hotel_luar_detail',
            'standar_perjadin_representatif',
            'standar_perjadin_transportasi',
            'users',
        ];
    }
}
