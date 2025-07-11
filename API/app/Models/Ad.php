<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
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

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function book() {
        return $this->belongsTo(Book::class);
    }
}
