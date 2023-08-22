<?php

namespace Database\Factories;

use App\Models\Ingredient;
use App\Models\Measurement;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RecipeIngredient>
 */
class RecipeIngredientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'recipe_id' => User::all()->random(),
            'ingredient_id' => Ingredient::all()->random(),
            'measurement_id' => Measurement::all()->random(),
            'quantity' => $this->faker->numberBetween(1, 10),
        ];
    }
}