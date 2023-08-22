<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShoppingListItem extends Model
{
    use HasFactory;
    public $timestamps = false;

    public function shoppingList()
    {
        return $this->belongsTo(ShoppingList::class);
    }

    public function ingredient()
    {
        return $this->belongsTo(Ingredient::class);
    }
}