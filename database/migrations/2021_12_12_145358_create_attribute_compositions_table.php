<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAttributeCompositionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('attribute_compositions', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->bigInteger('attribute_id')->nullable()->unsigned();
            $table->bigInteger('material_id')->nullable()->unsigned();
            $table->integer('percentage');
            $table->timestamps();
            $table->foreign('attribute_id')->references('product_id')->on('attributes')->cascadeOnDelete();
            $table->foreign('material_id')->references('id')->on('compositions')->nullOnDelete();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('attribute_compositions');
    }
}
