<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use App\Enums\BookCondition;

class Ad extends Model {
	protected $fillable = [
		'book_id',
		'user_id',
		'price',
		'condition',
		'comment',
		'cover_image',
	];

	protected $casts = [
		'condition' => BookCondition::class,
	];

	protected $appends = ['cover_image_url'];

	protected $hidden = ['cover_image'];

	public function getCoverImageUrlAttribute(): ?string {
		return $this->cover_image
			? URL::to(Storage::url($this->cover_image))
			: null;
	}

	public function user() {
		return $this->belongsTo(User::class);
	}

	public function book() {
		return $this->belongsTo(Book::class);
	}
}
