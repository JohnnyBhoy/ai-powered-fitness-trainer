<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use App\Models\User;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected function getCards(): array
    {
        return [
            Stat::make('Total Users', User::count()),
            Stat::make('Admins', User::where('is_admin', true)->count()),
            Stat::make('New This Week', User::where('created_at', '>=', now()->subWeek())->count()),
        ];
    }
}
