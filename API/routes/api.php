<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\BookController;
use App\Http\Middleware\JwtAuthMiddleware;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AuthorController;

// Route::apiResource('users', UserController::class);
Route::apiResource('books', BookController::class);
Route::apiResource('authors', AuthorController::class);

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware([JwtAuthMiddleware::class])->post('/validate', function () {
    return response()->json(['valid' => true]);
});
