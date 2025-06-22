<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Item extends Model {
	use HasFactory, SoftDeletes;

	protected $fillable = ['user_id', 'category_id', 'title', 'description', 'status'];

	public function category(): BelongsTo {
		return $this->belongsTo(Category::class);
	}
	public function attributeValues(): HasMany {
		return $this->hasMany(AttributeValue::class);
	}
	public function listing(): HasOne {
		return $this->hasOne(Listing::class);
	}

	public function getSpecsAttribute(): array {
		return $this->attributeValues
			->keyBy(fn($v) => $v->attribute->code)
			->map(fn($v)  => $this->castToNative($v))
			->toArray();
	}

	protected function castToNative(AttributeValue $v): mixed {
		return match ($v->attribute->data_type) {
			'int'     => (int)   $v->value,
			'decimal' => (float) $v->value,
			'date'    => Carbon::parse($v->value),
			'json'    => json_decode($v->value, true),
			default   => $v->value,
		};
	}
}
