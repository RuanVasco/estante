<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\BookController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;

// Route::apiResource('users', UserController::class);
Route::apiResource('books', BookController::class);

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->post('/validate', function (Request $request) {
    return response()->json([
        'valid' => true
    ]);
});
