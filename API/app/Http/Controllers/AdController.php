<?php

namespace App\Http\Controllers;

use App\Models\Ad;
use App\Enums\BookCondition;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class AdController extends Controller {
    public function index(Request $request) {
        $query = Ad::with('book');

        if ($search = $request->query('search')) {
            $query->whereHas('book', fn($q) =>
            $q->where('title', 'like', "%$search%"));
        }

        return $query->orderByDesc('created_at')
            ->paginate(15);
    }

    public function indexByUser(int $userId) {
        $ads = Ad::with('book')
            ->where('user_id', $userId)
            ->orderByDesc('created_at')
            ->paginate(15);

        return response()->json($ads);
    }

    public function store(Request $request) {
        logger('debug condition:', [$request->input('condition')]);

        $validated = $request->validate([
            'book_id'     => 'required|exists:books,id',
            'price'       => 'required|numeric|min:0.01',
            'condition'   => ['required', Rule::enum(BookCondition::class)],
            'comment'     => 'nullable|string|max:1000',
            'cover_image' => [
                'nullable',
                File::image()->max(3_000),
            ],
        ]);

        $validated['user_id'] = $request->user()->id;

        if ($request->file('cover_image')) {
            $path = $request->file('cover_image')
                ->store('covers', 'public');
            $validated['cover_image'] = $path;
        }

        $ad = Ad::create($validated);

        return response()->json($ad->load(['book', 'user']), 201);
    }

    public function show(Ad $ad) {
        return $ad->load('book');
    }

    public function update(Request $request, Ad $ad) {
        $validated = $request->validate([
            'price'       => 'sometimes|numeric|min:0.01',
            'condition'   => ['required', Rule::enum(BookCondition::class)],
            'comment'     => 'nullable|string|max:1000',
            'cover_image' => [
                'nullable',
                File::image()->max(3_000),
            ],
        ]);

        if ($request->file('cover_image')) {
            $path = $request->file('cover_image')
                ->store('covers', 'public');
            $validated['cover_image'] = $path;
        }

        $ad->update($validated);

        return $ad->load('book');
    }

    public function destroy(Ad $ad) {
        $ad->delete();
        return response()->noContent();
    }

    public function create() {
        return response()->json(['message' => 'Not implemented'], 501);
    }

    public function edit(Ad $ad) {
        return response()->json(['message' => 'Not implemented'], 501);
    }
}
