<?php

namespace App\Http\Middlewares;

use Closure;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class JwtAuthMiddleware {
    public function handle(Request $request, Closure $next): JsonResponse|Request {
        $header = $request->header('Authorization');

        if (!$header || !str_starts_with($header, 'Bearer ')) {
            return response()->json(['message' => 'Token não fornecido'], 401);
        }

        $token = substr($header, 7);

        try {
            $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));

            $user = User::find($decoded->sub);
            if (!$user) {
                return response()->json(['message' => 'Usuário não encontrado'], 401);
            }

            Auth::login($user);

            $request->merge(['auth_user_id' => $decoded->sub]);

            return $next($request);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Token inválido'], 401);
        }
    }
}
