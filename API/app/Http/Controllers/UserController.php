<?php

namespace App\Http\Controllers;

use App\Models\Ad;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserController extends Controller {
	public function show(User $user): JsonResponse {
		return response()->json($user);
	}
}
