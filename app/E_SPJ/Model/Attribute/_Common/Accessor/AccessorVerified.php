<?php

use Carbon\Carbon;

trait AccessorVerified
{

    public function __construct($attributes = array())
    {

        parent::__construct($attributes);

    }

    public function getVerifiedAtAttribute()
    {
        if (filled($this->attributes['verified_at'])) {
            return Carbon::parse($this->attributes['verified_at'])->format('d/m/Y');
        }
    }
}
