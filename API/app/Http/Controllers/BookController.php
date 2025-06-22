<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Book;

class BookController extends Controller {
	public function show(Book $book): JsonResponse {
		return response()->json($book);
	}

	public function store(Request $request): JsonResponse {
		$data = $request->validate([
			'title'       => 'required|string|max:255',
			'author'      => 'nullable|string|max:255',
			'isbn'        => 'nullable|string|max:20|unique:books',
			'published_at' => 'nullable|date',
			'description' => 'nullable|string',
		]);

		$book = Book::create($data);

		return response()->json($book, 201);
	}

	public function index(Request $request): JsonResponse {
		$perPage = (int) $request->input('per_page', 10);

		$books = Book::paginate($perPage);

		return response()->json($books);
	}
}
