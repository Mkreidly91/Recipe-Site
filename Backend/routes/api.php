<?php

use App\Http\Controllers\RecipeController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;



Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::post('logout', [AuthController::class, 'logout']);
Route::post('refresh', [AuthController::class, 'refresh']);


Route::prefix('user')->group(function () {
    Route::get('getAll', [UserController::class, 'getAllRecipes']);
    Route::post('like', [UserController::class, 'likeRecipe']);
    Route::post('comment', [UserController::class, 'comment']);
});

Route::prefix('recipe')->group(function () {
    Route::get('getComments/{recipeId}', [RecipeController::class, 'getRecipeComments']);
    Route::post('addRecipe', [RecipeController::class, 'addRecipe']);
    Route::get('getMeasurements', [RecipeController::class, 'getMeasurements']);
});