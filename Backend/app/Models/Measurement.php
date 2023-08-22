<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Measurement extends Model
{
    use HasFactory;
    public $timestamps = false;
    public function recipeIngredients()
    {
        return $this->hasMany(RecipeIngredient::class);
    }
}