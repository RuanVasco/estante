<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model {
    protected $fillable = ['title', 'isbn', 'author_id', 'publisher_id', 'published_year'];

    public function author() {
        return $this->belongsTo(Author::class);
    }

    public function publisher() {
        return $this->belongsTo(Publisher::class);
    }
}
