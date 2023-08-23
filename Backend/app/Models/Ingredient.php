<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = ["name"];
    public function recipes()
    {
        return $this->belongsToMany(Recipe::class, 'recipe_ingredients')
            ->withPivot('quantity', 'measurement_id');
    }

    public function shoppingListItems()
    {
        return $this->hasMany(ShoppingListItem::class);
    }
}