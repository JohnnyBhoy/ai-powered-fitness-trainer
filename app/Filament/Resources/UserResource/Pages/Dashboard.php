<?php

namespace App\Filament\Resources\UserResource\Pages;

use App\Filament\Widgets\StatsOverview;
use App\Filament\Widgets\LatestUsers;
use Filament\Pages\Dashboard as BaseDashboard;

class Dashboard extends BaseDashboard
{
    protected function getHeaderWidgets(): array
    {
        // Top of the dashboard
        return [
            StatsOverview::class,
        ];
    }

    protected function getFooterWidgets(): array
    {
        // Bottom of the dashboard
        return [
            LatestUsers::class,
        ];
    }
}
