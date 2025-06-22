<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AttributeValue extends Model {
	public $timestamps = false;
	protected $fillable = ['item_id', 'attribute_id', 'value'];

	public function item(): BelongsTo {
		return $this->belongsTo(Item::class);
	}
	public function attribute(): BelongsTo {
		return $this->belongsTo(Attribute::class);
	}
}
