<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
	/**
	 * Run the migrations.
	 */
	public function up(): void {
		Schema::create('listings', function (Blueprint $table) {
			$table->id();
			$table->foreignId('item_id')->constrained()->cascadeOnDelete();
			$table->decimal('price', 10, 2);
			$table->char('currency', 3)->default('BRL');
			$table->enum('condition', ['novo', 'usado', 'lacrado']);
			$table->unsignedInteger('quantity')->default(1);
			$table->enum('status', ['active', 'sold', 'paused'])->default('active');
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void {
		Schema::table('listings', function (Blueprint $table) {
			//
		});
	}
};
