<?php

namespace App\Http\Controllers;

use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller {
    public function login(Request $request): JsonResponse {
        $credentials = $request->validate([
            'email'    => ['required', 'email'],
            'password' => ['required'],
        ]);

        $user = User::where('email', $credentials['email'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json(['message' => 'Credenciais inválidas'], 401);
        }

        $payload = [
            'sub'   => $user->id,
            'name'  => $user->name,
            'email' => $user->email,
            'iat'   => time(),
            'exp'   => time() + (60 * 60 * 24),
        ];

        $jwt = JWT::encode($payload, env('JWT_SECRET'), 'HS256');

        return response()->json([
            'user' => $user,
            'token' => $jwt,
        ]);
    }

    public function register(Request $request): JsonResponse {
        $data = $request->validate([
            'name'       => 'required|string|max:255',
            'email'      => 'required|email|max:255|unique:users',
            'password'   => 'required|string|max:255',
        ]);

        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);

        return response()->json($user, 201);
    }

    public function index(Request $request): JsonResponse {
        $perPage = (int) $request->input('per_page', 10);

        $users = User::paginate($perPage);

        return response()->json($users);
    }
}
