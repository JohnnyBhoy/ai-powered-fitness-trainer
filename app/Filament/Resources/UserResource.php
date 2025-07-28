<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Filament\Resources\UserResource\RelationManagers;
use App\Models\GpfBiometric;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Facades\Hash;
use Filament\Forms\Components\Group;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('User Info')
                    ->schema([
                        TextInput::make('first_name')->required()->label('First Name'),
                        TextInput::make('last_name')->required()->label('Last Name'),
                        TextInput::make('email')->email()->required(),
                        TextInput::make('password')
                            ->label('Password')
                            ->password()
                            ->maxLength(255)
                            ->dehydrateStateUsing(fn($state) => filled($state) ? Hash::make($state) : null)
                            ->dehydrated(fn($state) => filled($state)) // Don't overwrite password if empty
                            ->required(fn(string $context) => $context === 'create')
                            ->placeholder(fn(string $context) => $context === 'edit' ? 'Leave blank to keep current password' : null),
                    ]),

                Section::make('Location And Biometrics Info')
                    ->schema([
                        Group::make()
                            ->relationship('gpfbiometric')
                            ->schema([
                                Select::make('strictness_level')
                                    ->label('Strictness Level')
                                    ->required()
                                    ->options([
                                        1 => 'Chill: General meal guidelines (no tracking)',
                                        2 => 'Balanced: Macro targets with suggested portions',
                                        3 => 'Strict: Precise calorie/macro tracking with specific food weights',
                                    ])
                                    ->native(false),
                                TextInput::make('phone_number')->required()->label('Phone Number'),
                                TextInput::make('city')->required()->label('City'),
                                TextInput::make('state')->required()->label('State'),
                                TextInput::make('age')->required()->label('Age'),
                                Select::make('sex')
                                    ->label('Sex')
                                    ->required()
                                    ->options([
                                        'male' => 'Male',
                                        'female' => 'Female',
                                        'other' => 'Others',
                                    ])
                                    ->native(false),
                                TextInput::make('current_weight')->required()->label('Current Weight'),
                                TextInput::make('goal_weight')->required()->label('Goal Weight'),
                                Select::make('fitness_level')
                                    ->label('Fitness Level')
                                    ->required()
                                    ->options([
                                        'beginner' => 'Beginner',
                                        'intermediate' => 'Intermediate',
                                        'advanced' => 'Advanced',
                                    ])
                                    ->native(false),
                                TextInput::make('equipment_access')->required()->label('Equipment Access'),
                                TextInput::make('food_allergies')->required()->label('Food Allergies'),
                            ]),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('first_name')->label('First Name'),
                TextColumn::make('last_name')->label('Last Name'),
                TextColumn::make('email'),
                TextColumn::make('gpfbiometric.strictness_level')->label('Strictness Level')
                    ->formatStateUsing(fn($state) => match ($state) {
                        1 => 'Chill: General meal guidelines (no tracking)',
                        2 => 'Balanced: Macro targets with suggested portions',
                        3 => 'Strict: Precise calorie/macro tracking with specific food weights',
                        default => 'Not specified',
                    }),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->with('gpfbiometric');
    }
}
