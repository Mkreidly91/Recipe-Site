<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Comment;
use App\Models\Image;
use App\Models\Ingredient;
use App\Models\Like;
use App\Models\Measurement;
use App\Models\Recipe;
use App\Models\RecipeIngredient;
use App\Models\ShoppingList;
use App\Models\ShoppingListItem;
use App\Models\User;
use Illuminate\Database\Seeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $measurementTypes = [
            'teaspoon(s)',
            'tablespoon(s)',
            'fluid ounce(s)',
            'cup(s)',
            'pint(s)',
            'quart(s)',
            'gallon(s)',
            'milliliter(s)',
            'liter(s)',
            'ounce(s)',
            'pound(s)',
            'gram(s)',
            'kilogram(s)',
            'each',
            'piece(s)',
            'item(s)',
            'pinch(es)',
            'dash(es)',
            'scoop(s)',
            'handful(s)',
            'slice(s)',
            'fillet(s)',
            'clove(s)',
            'sprig(s)',
            'leaf(s)',
            'bulb(s)',
            'can(s)'
        ];


        for ($i = 0; $i < count($measurementTypes); $i++) {
            Measurement::create(['name' => $measurementTypes[$i]]);
        }


        User::factory(30)->create();
        Recipe::factory(100)->create();
        Ingredient::factory(200)->create();
        RecipeIngredient::factory(500)->create();
        Image::factory(300)->create();
        Like::factory(500)->create();
        Comment::factory(200)->create();
        ShoppingList::factory(100)->create();
        ShoppingListItem::factory(200)->create();


    }
}