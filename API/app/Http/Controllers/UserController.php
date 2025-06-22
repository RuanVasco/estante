<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\User;

class UserController extends Controller {
	public function show(User $user): JsonResponse {
		return response()->json($user);
	}

	public function store(Request $request): JsonResponse {
		$data = $request->validate([
			'name'       => 'required|string|max:255',
			'email'      => 'required|email|max:255|unique:users',
			'password'   => 'required|string|max:255|',
		]);

		$user = User::create($data);

		return response()->json($user, 201);
	}

	public function index(Request $request): JsonResponse {
		$perPage = (int) $request->input('per_page', 10);

		$users = User::paginate($perPage);

		return response()->json($users);
	}
}
