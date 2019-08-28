<?php

trait AttributeDataDasarPegawai
{
    use \AccessorTanggalLahir;

    public function __construct($attributes = array())
    {

        parent::__construct($attributes);

        $this->appends = [
            'nama_lengkap',
        ];

    }

    public function getNamaLengkapAttribute()
    {
        return $this->gelar_depan . ' ' . $this->nama . ' ' . $this->gelar_belakang;
    }
}
