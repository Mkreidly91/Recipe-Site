<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    function getAllRecipes()
    {
        $user = Auth::user();
        $recipes = Recipe::all();
        return response()->json([
            "recipes" => $recipes
        ]);
    }
}