<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Ingredient;
use App\Models\Like;
use App\Models\Measurement;
use App\Models\Recipe;
use App\Models\RecipeIngredient;
use Illuminate\Http\Request;
use \App\Models\Comment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class RecipeController extends Controller
{
    function addRecipe(Request $request)
    {



        $user = Auth::user();
        $request->validate([
            "name" => "required|string",
            "cuisine" => "required|string",
            "ingredients" => "required|array",
            "ingredients.*.ingredient" => "required|string",
            "ingredients.*.quantity" => "required",
            "ingredients.*.measurement" => "required|exists:measurements,id",
            "images" => "required|array",
            "images.*" => "required|string",
        ]);

        try {
            $post = new Recipe;

            $post->user_id = $user->id;
            $post->name = $request->name;
            $post->cuisine = $request->cuisine;
            $post->save();

            foreach ($request->ingredients as $ingredient) {
                $newIngredient = Ingredient::firstOrCreate(["name" => $ingredient["ingredient"]]);
                $recipeIngredient = new RecipeIngredient;
                $recipeIngredient->recipe_id = $post->id;
                $recipeIngredient->ingredient_id = $newIngredient->id;
                $recipeIngredient->measurement_id = $ingredient["measurement"];
                $recipeIngredient->save();
            }

            // Decode base 64
            if ($request->images) {


                foreach ($request->images as $image_64) {

                    $img = new Image;
                    $img->recipe_id = $post->id;
                    $extension = explode('/', explode(':', substr($image_64, 0, strpos($image_64, ';')))[1])[1];
                    $replace = substr($image_64, 0, strpos($image_64, ',') + 1);
                    $image = str_replace($replace, '', $image_64);
                    $image = str_replace(' ', '+', $image);
                    $filename = uniqid() . '.' . $extension;
                    $image_url = 'images/' . $filename;
                    Storage::disk('public')->put('images/' . $filename, base64_decode($image));
                    $img->image_url = $image_url;
                    $img->save();
                }
            }
            // $recipe = Recipe::With(['user', 'comments', 'likes', 'images', 'ingredients'])->find($post->id);




            return response()->json([
                'message' => 'success',
            ], 200);
        } catch (\Exception $e) {
            $post->delete();
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }

    }
    function getRecipeComments($recipeId)
    {
        // $comments = Comment::Where("recipe_id", $recipeId)->with("user")->get();
        // $comments = $comments->map(function($comment){

        // })
        // return response()->json([
        //     "comments" => $comments
        // ]);
    }
    function getMeasurements()
    {
        $measurements = Measurement::all();
        return response()->json(
            $measurements
        );
    }

    public function search($q = " ")
    {
        $recipes = Recipe::where('name', 'LIKE', "%$q%")
            ->orWhere('cuisine', 'LIKE', "%$q%")
            ->orWhereHas('ingredients', function ($query) use ($q) {
                $query->where('name', 'LIKE', "%$q%");
            })
            ->with(['user', 'ingredients', 'images', 'likes', 'comments'])
            ->get();

        $res = $recipes->map(function ($recipe) {
            $comments = $recipe->comments->map(function ($comment) {
                return [
                    "comment" => $comment->comment,
                    "user" => $comment->user->name
                ];
            });

            $ingredients = $recipe->ingredients->map(function ($ingredient) {
                return [
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
            "recipes" => $res
        ]);

    }
}