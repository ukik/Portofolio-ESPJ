<?php

trait MiscellaneousLabel
{
    public function getDescriptionForEvent(string $eventName): string
    {
        return "Permohonan (TU) {$eventName}";
    }
}
