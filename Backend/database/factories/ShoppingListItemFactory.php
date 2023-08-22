<?php

namespace Database\Factories;

use App\Models\Ingredient;
use App\Models\ShoppingList;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ShoppingListItem>
 */
class ShoppingListItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "shopping_list_id" => ShoppingList::all()->random(),
            "ingredient_id" => Ingredient::all()->random(),
        ];
    }
}