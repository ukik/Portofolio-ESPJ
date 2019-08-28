<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Carbon\Carbon;

class BackupStandar extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'backup:standar';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Backup Table Standar';

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

        $filename = 'backup-db/e-spj-standar-' . date('Y-m-d-H-i') . '.sql';
        \Spatie\DbDumper\Databases\MySql::create()
            ->setDbName(env('DB_DATABASE'))
            ->setUserName(env('DB_USERNAME'))
            ->setPassword(env('DB_PASSWORD'))
            ->includeTables($this->tables())
            ->dumpToFile(public_path($filename));

        $zipper = new \Chumper\Zipper\Zipper;
        $zipper->make(public_path($filename).'.zip')->add(public_path($filename))->close();
        unlink(public_path($filename));

        $this->output->writeln("<info>Backup Table Standar :</info> " . $filename . '.zip');
    }

    public function tables()
    {
        return [
            'standar_honor',
            'standar_perjadin_harian_dalam',
            'standar_perjadin_harian_luar',
            'standar_perjadin_harian_luar_detail',
            'standar_perjadin_hotel_dalam',
            'standar_perjadin_hotel_luar',
            'standar_perjadin_hotel_luar_detail',
            'standar_perjadin_representatif',
            'standar_perjadin_transportasi',
        ];
    }
}
