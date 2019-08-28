

<?php

use Carbon\Carbon;

trait AttributeLampiranPerjadin
{
    use \AccessorTanggal;

    public function __construct($attributes = array())
    {

        parent::__construct($attributes);

    }

    public function getDisplayTanggalSuratAttribute()
    {
        if (filled($this->attributes['tanggal_surat'])) {
            return IndonesiaDate($this->attributes['tanggal_surat']);
        }
    }

    public function getTanggalBerangkatAttribute()
    {
        if (filled($this->attributes['tanggal_berangkat'])) {
            return Carbon::parse($this->attributes['tanggal_berangkat'])
                ->format('Y-m-d');
        }
    }

    public function getDisplayTanggalBerangkatAttribute()
    {
        if (filled($this->attributes['tanggal_berangkat'])) {
            return IndonesiaDate($this->attributes['tanggal_berangkat']);
        }
    }

    public function getTanggalKembaliAttribute()
    {
        if (filled($this->attributes['tanggal_kembali'])) {
            return Carbon::parse($this->attributes['tanggal_kembali'])
                ->format('Y-m-d');
        }
    }

    public function getDisplayTanggalKembaliAttribute()
    {
        if (filled($this->attributes['tanggal_kembali'])) {
            return IndonesiaDate($this->attributes['tanggal_kembali']);
        }
    }

}
