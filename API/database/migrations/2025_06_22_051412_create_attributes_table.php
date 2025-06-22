<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
	/**
	 * Run the migrations.
	 */
	public function up(): void {
		Schema::create('attributes', function (Blueprint $table) {
			$table->id();
			$table->foreignId('category_id')->constrained()->cascadeOnDelete();
			$table->string('code');
			$table->string('label');
			$table->enum('data_type', ['string', 'int', 'decimal', 'date', 'text', 'json']);
			$table->boolean('is_required')->default(false);
			$table->unique(['category_id', 'code']);
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void {
		Schema::table('attributes', function (Blueprint $table) {
			//
		});
	}
};
