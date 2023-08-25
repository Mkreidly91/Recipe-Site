<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Like;
use App\Models\Measurement;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    function getAllRecipes()
    {
        $user = Auth::user();

        $recipes = Recipe::with(['user', 'comments', 'likes', 'images', 'ingredients'])->get();

        $res = $recipes->map(function ($recipe) {
            $comments = $recipe->comments->map(function ($comment) {
                return [
                    "comment" => $comment->comment,
                    "user" => $comment->user->name
                ];
            });

            $ingredients = $recipe->ingredients->map(function ($ingredient) {
                return [
                    "id" => $ingredient->id,
                    "name" => $ingredient->name,
                    "quantity" => $ingredient->pivot->quantity,
                    "measurement" => Measurement::find($ingredient->pivot->measurement_id)->name
                ];
            });

            $images = $recipe->images->map(function ($image) {
                $image_url = $image->image_url;
                if (Storage::disk('public')->exists($image_url)) {
                    $imageContents = Storage::disk('public')->get($image_url);
                    $mimeType = Storage::disk('public')->mimeType($image_url);
                    $image->image_url = 'data:' . $mimeType . ';base64,' . base64_encode($imageContents);

                }
                return [
                    "image" => $image->image_url,
                ];
            });




            $recipe->comments = $comments;
            $recipe->ingredients = $ingredients;


            return array_merge($recipe->toArray(), [
                "comments" => $comments,
                "ingredients" => $ingredients,
                "likes" => count($recipe->likes),
                "isLiked" => Like::where('user_id', Auth::id())->where('recipe_id', $recipe->id)->exists(),
                "images" => $images,
            ]);
        });


        return response()->json([
            // "recipes" => $recipes,
            "recipes" => $res
        ]);
    }

    function likeRecipe(Request $request)
    {
        $user = Auth::user();
        $recipeId = $request->recipeId;
        $existingLike =
            Like::where('Recipe_id', $recipeId)
                ->where('user_id', $user->id)
                ->first();
        if ($existingLike) {
            $existingLike->delete();
            return response()->json(['message' => 'Recipe unliked'], 200);
        }

        $likeRecipe = new Like;
        $likeRecipe->Recipe_id = $recipeId;
        $likeRecipe->user_id = $user->id;
        $likeRecipe->save();
        return response()->json(['message' => 'Recipe liked'], 200);
    }

    function comment(Request $request)
    {

        $request->validate([
            "comment" => "required|string|max:255",
            "recipeId" => "required | exists:recipes,id"
        ]);

        $user = Auth::user();
        $recipeId = $request->recipeId;
        $comment = new Comment;
        $comment->comment = $request->comment;
        $comment->recipe_id = $request->recipeId;
        $comment->user_id = $user->id;

        $comment->save();

        return response()->json([
            "message" => "Comment successfully created",
            "comment" => ["comment" => $comment->comment, "user" => $comment->user->name]

        ], 200);


    }

}