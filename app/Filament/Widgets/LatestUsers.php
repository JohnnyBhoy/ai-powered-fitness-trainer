<?php

namespace App\Filament\Widgets;

use App\Models\User;
use Filament\Widgets\TableWidget as BaseWidget;
use Filament\Tables\Columns\TextColumn;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\Relation;

class LatestUsers extends BaseWidget
{
    protected int|string|array $columnSpan = 'full';

   protected function getTableQuery(): Builder|Relation|null
{
    return User::query()->latest()->limit(5);
}

    protected function getTableColumns(): array
    {
        return [
            TextColumn::make('name'),
            TextColumn::make('email'),
            TextColumn::make('created_at')->dateTime(),
        ];
    }
}

