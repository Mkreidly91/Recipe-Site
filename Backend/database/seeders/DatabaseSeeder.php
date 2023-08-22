<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Measurement;
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
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}