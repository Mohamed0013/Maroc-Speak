<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\Categorie;
use App\Models\Prof;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProfCategories extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $id = Auth::user()->id;
        $prof_id = Prof::where("user_id", $id)->first()->id;
        $categories = Categorie::where('prof_id', $prof_id)->orderBy('created_at', 'desc')->get();
        return CategoryResource::collection($categories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'cat_name' => 'required|string|max:255',
            // 'cat_image' => 'image|mimes:jpeg,png,jpg,gif|max:2048', // Validate image upload
            'cat_description' => 'required',
        ]);

        // Handle image upload
        // if ($request->hasFile('cat_image')) {
        //     $image = $request->file('cat_image');
        //     $imageName = time() . '.' . $image->getClientOriginalExtension();
        //     $image->move(public_path('images'), $imageName); // Move uploaded image to a folder
        //     $validatedData['cat_image'] = $imageName; // Store image path in database
        // }

        $id = Auth::user()->id;
        $prof_id = Prof::where('user_id', $id)->first()->id;

        $validatedData['prof_id'] = $prof_id;
        $category = Categorie::create($validatedData);

        return response()->json(new CategoryResource($category), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Categorie::where('id', $id)->forceDelete();
        return response("", 204);
    }

    public function searchCategories(Request $request)
    {
        $id = Auth::user()->id;
        $prof_id = Prof::where("user_id", $id)->first()->id;
        $query = $request->input('query');
        $categories = Categorie::where('prof_id', $prof_id)->where('cat_name', 'like', '%' . $query . '%')
                                ->get();

        return response()->json($categories);
    }
}
