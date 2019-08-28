<?php

if (!function_exists('IndonesiaDate')) {
    function IndonesiaDate($date)
    {
        if (blank($date)) {
            return null;
        }

        \Carbon\Carbon::setLocale('id');

        $date = \Carbon\Carbon::parse($date);

        $l = $date->format('l');
        $day = $date->format('d');
        $month = $date->format('n');
        $year = $date->format('Y');

        $l = \Lang::get('date.day.' . $l) . ',';
        $month = \Lang::get('date.month.' . $month);

        return sprintf('%02d %s %d', $day, $month, $year);
    }
}

if (!function_exists('Tahun')) {
    function Tahun()
    {
        return Getter('tahun') ?: date('Y');
    }
}

if (!function_exists('PlainDate')) {
    function PlainDate($date, $format = 'Y-m-d') 
    {
        if (filled($date)) {
            return date('Y-m-d', strtotime($date));
            return date('d/m/Y', strtotime($date));
        } else {
            return null;
        }
    }
}
