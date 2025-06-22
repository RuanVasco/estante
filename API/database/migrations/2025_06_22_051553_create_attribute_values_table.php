<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
	/**
	 * Run the migrations.
	 */
	public function up(): void {
		Schema::create('attribute_values', function (Blueprint $table) {
			$table->id();
			$table->foreignId('item_id')->constrained()->cascadeOnDelete();
			$table->foreignId('attribute_id')->constrained()->cascadeOnDelete();
			$table->text('value');
			$table->unique(['item_id', 'attribute_id']);
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void {
		Schema::table('attribute_values', function (Blueprint $table) {
			//
		});
	}
};
