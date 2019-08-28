<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Carbon\Carbon;

class BackupData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'backup:data';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Backup Table Data';

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

        $filename = 'backup-db/e-spj-data-' . date('Y-m-d-H-i') . '.sql';
        \Spatie\DbDumper\Databases\MySql::create()
            ->setDbName(env('DB_DATABASE'))
            ->setUserName(env('DB_USERNAME'))
            ->setPassword(env('DB_PASSWORD'))
            ->includeTables($this->tables())
            ->dumpToFile(public_path($filename));

        $zipper = new \Chumper\Zipper\Zipper;
        $zipper->make(public_path($filename).'.zip')->add(public_path($filename))->close();
        unlink(public_path($filename));

        $this->output->writeln("<info>Backup Table Data :</info> " . $filename . '.zip');
    }

    public function tables()
    {
        return [
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
        ];
    }
}
