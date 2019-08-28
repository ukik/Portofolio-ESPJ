<?php

trait AttributePermohonanTambahUang
{
    use \AccessorTanggal;
    use \AccessorVerified;

    function __construct($attributes = array())
    {

        parent::__construct($attributes);

    }
}
