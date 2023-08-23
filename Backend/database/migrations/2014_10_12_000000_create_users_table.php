<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {



    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
        });

        Schema::create('recipes', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("cuisine");
            $table->unsignedBigInteger("user_id");
            $table->foreign('user_id')->references('id')->on('users')->onDelete("cascade");
        });


        Schema::create('ingredients', function (Blueprint $table) {
            $table->id();
            $table->string("name");
        });

        Schema::create('measurements', function (Blueprint $table) {
            $table->id();
            $table->string("name");
        });

        Schema::create('recipe_ingredients', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("recipe_id");
            $table->unsignedBigInteger("ingredient_id");
            $table->unsignedBigInteger("measurement_id");
            $table->integer("quantity")->default(1);
            $table->foreign('recipe_id')->references('id')->on('recipes')->onDelete("cascade");
            $table->foreign('ingredient_id')->references('id')->on('ingredients')->onDelete("cascade");
            $table->foreign('measurement_id')->references('id')->on('measurements');

        });

        Schema::create('images', function (Blueprint $table) {
            $table->id();
            $table->string("image_url");
            $table->unsignedBigInteger("recipe_id");
            $table->foreign('recipe_id')->references('id')->on('recipes')->onDelete("cascade");
        });

        Schema::create('likes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("user_id");
            $table->unsignedBigInteger("recipe_id");
            $table->foreign('user_id')->references('id')->on('users')->onDelete("cascade");
            $table->foreign('recipe_id')->references('id')->on('recipes')->onDelete("cascade");
        });

        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->text("comment");
            $table->unsignedBigInteger("user_id");
            $table->unsignedBigInteger("recipe_id");
            $table->foreign('user_id')->references('id')->on('users')->onDelete("cascade");
            $table->foreign('recipe_id')->references('id')->on('recipes')->onDelete("cascade");
        });

        Schema::create('shopping_lists', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->unsignedBigInteger("user_id");
            $table->foreign('user_id')->references('id')->on('users')->onDelete("cascade");
        });

        Schema::create('shopping_list_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("shopping_list_id");
            $table->unsignedBigInteger("ingredient_id");
            $table->foreign('shopping_list_id')->references('id')->on('shopping_lists')->onDelete("cascade");
            $table->foreign('ingredient_id')->references('id')->on('ingredients')->onDelete("cascade");

        });

        Schema::create('mealplans', function (Blueprint $table) {
            $table->unsignedBigInteger("user_id");
            $table->unsignedBigInteger("recipe_id");
            $table->date("date");
            $table->foreign('user_id')->references('id')->on('users')->onDelete("cascade");
            $table->foreign('recipe_id')->references('id')->on('recipes')->onDelete("cascade");
        });

    }

    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('recipes');
        Schema::dropIfExists('ingredients');

        Schema::dropIfExists('measurements');
        Schema::dropIfExists('recipe_ingredients');
        Schema::dropIfExists('images');

        Schema::dropIfExists('likes');
        Schema::dropIfExists('comments');
        Schema::dropIfExists('shopping_lists');

        Schema::dropIfExists('shopping_list_items');
        Schema::dropIfExists('mealplans');
    }
};