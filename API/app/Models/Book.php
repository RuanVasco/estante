<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model {
	protected $fillable = [
		'title',
		'author',
		'isbn',
		'description',
		'published_at',
	];

	protected $hidden = [
		'created_at',
		'updated_at',
	];
}
