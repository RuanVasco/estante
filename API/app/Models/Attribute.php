<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Attribute extends Model {
	protected $fillable = ['category_id', 'code', 'label', 'data_type', 'is_required'];

	public function category(): BelongsTo {
		return $this->belongsTo(Category::class);
	}
	public function values(): HasMany {
		return $this->hasMany(AttributeValue::class);
	}
}
