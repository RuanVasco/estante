<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
	/**
	 * Run the migrations.
	 */
	public function up(): void {
		Schema::create('items', function (Blueprint $table) {
			$table->id();
			$table->foreignId('user_id')->constrained()->cascadeOnDelete();
			$table->foreignId('category_id')->constrained()->restrictOnDelete();
			$table->string('title');
			$table->text('description')->nullable();
			$table->enum('status', ['private', 'public'])->default('private');
			$table->timestamps();
			$table->softDeletes();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void {
		Schema::table('items', function (Blueprint $table) {
			//
		});
	}
};
