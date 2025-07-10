<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        $query = Book::query();

        if ($search = $request->query('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', '%' . $search . '%')
                    ->orWhere('isbn', 'like', '%' . $search . '%')
                    ->orWhereHas('author', fn($qa) =>
                    $qa->where('name', 'like', '%' . $search . '%'))
                    ->orWhereHas('publisher', fn($qp) =>
                    $qp->where('name', 'like', '%' . $search . '%'));
            });
        }

        return response()->json($query->limit(10)->get());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'isbn' => 'required|string|max:20|unique:books,isbn',
            'published_year' => 'nullable|integer|min:0|max:' . date('Y'),
            'author_id' => 'required|exists:authors,id',
            'publisher_id' => 'required|exists:publishers,id',
        ]);

        $book = Book::create($validated);

        return response()->json([
            'message' => 'Livro cadastrado com sucesso.',
            'book' => $book->load(['author', 'publisher']),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Book $book) {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Book $book) {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book) {
        //
    }
}
