<?php

trait AttributeStandarPerjadinTransportasi
{

    public function __construct($attributes = array())
    {

        parent::__construct($attributes);

        $this->appends = [
            'tujuan',
        ];

    }

    public function getTujuanAttribute()
    {
        $berangkat = data_get($this->lokasi_berangkat, 'nama');
        $tujuan = data_get($this->lokasi_tujuan, 'nama');
        return sprintf('%s - %s', $berangkat, $tujuan);
    }

}
