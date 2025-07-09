<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\Request;

class AuthorController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        return response()->json(['message' => 'Not implemented'], 501);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $author = Author::create($validated);

        return response()->json($author, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        $author = Author::findOrFail($id);
        return response()->json($author);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id) {
        return response()->json(['message' => 'Not implemented'], 501);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id) {
        $author = Author::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $author->update($validated);

        return response()->json($author);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        $author = Author::findOrFail($id);
        $author->delete();

        return response()->json(['message' => 'Autor removido com sucesso.']);
    }
}
