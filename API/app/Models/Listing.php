<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Listing extends Model {
	use HasFactory;

	protected $fillable = [
		'item_id',
		'price',
		'currency',
		'condition',
		'quantity',
		'status',
	];

	protected $casts = [
		'price'     => 'decimal:2',
		'quantity'  => 'integer',
	];

	public function item(): BelongsTo {
		return $this->belongsTo(Item::class);
	}

	public function owner(): BelongsTo {
		return $this->item()->withDefault()->getRelation('item')->user();
	}

	protected function formattedPrice(): Attribute {
		return Attribute::get(
			fn() => number_format($this->price, 2, ',', '.') . ' ' . $this->currency
		);
	}

	public function scopeActive(Builder $q): Builder {
		return $q->where('status', 'active');
	}

	public function scopeByCurrency(Builder $q, string $cur): Builder {
		return $q->where('currency', strtoupper($cur));
	}

	public function markAsSold(): void {
		$this->update([
			'status'    => 'sold',
			'quantity'  => 0,
		]);
	}

	public function isAvailable(): bool {
		return $this->status === 'active' && $this->quantity > 0;
	}
}
