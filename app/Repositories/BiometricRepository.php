<?php

namespace App\Repositories;

use App\Models\GpfBiometric;

class BiometricRepository
{
    /**
     * Summary of create
     * @param mixed $request
     * @return GpfBiometric
     */
    public function create($request)
    {
        return GpfBiometric::create([
            ...$request->validated(),
        ]);
    }
}
