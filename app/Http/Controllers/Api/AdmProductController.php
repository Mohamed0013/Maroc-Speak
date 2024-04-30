<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\AdmProductResource;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AdmProductController extends Controller
{
    public function __construct()
    {
        $this->middleware('admin'); 
    } 
    
    /** 
     * Display a listing of the resource.
     * @return AnonymousResourceCollection
     */ 
    public function index()
    {
        return AdmProductResource::collection(
            Product::query()->paginate(10) 
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $data = $request->validated();

         // Handle multiple image uploads
         if ($request->hasFile('images')) {
            foreach ($request->file('images') as $imageFile) {
                $imagePath = $request->file('image')->store('products', 'public');
                $data->image = $imagePath;
            }
        }
     
        // Calculate discount
         $data['discount'] = (($data['pre_price'] - $data['price']) / $data['pre_price']) * 100;

         // Create the product
         $product = Product::create($data);
            
        return response(new AdmProductResource($product), 201); 
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        // $product = Product::find($id);
        // $image1 = $product->image1;
        // $image2 = $product->image2;
        // $image3 = $product->image3;
        return new AdmProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $data = $request->validated();

        // Handle multiple image uploads
        if ($request->hasFile('images')) {
            $images = $request->file('images');
            $data['image1'] = isset($images[0]) ? $images[0]->store('products') : null;
            $data['image2'] = isset($images[1]) ? $images[1]->store('products') : null;
            $data['image3'] = isset($images[2]) ? $images[2]->store('products') : null;
            $data['image4'] = isset($images[3]) ? $images[3]->store('products') : null;
            $data['image5'] = isset($images[4]) ? $images[4]->store('products') : null;
        }
        
        $data['discount'] = (($data['pre_price'] - $data['price']) / $data['pre_price']) * 100;
        
        $product->update($data);

        return new AdmProductResource($product);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Product::where('id',$id)->delete();

        return response("", 204);
    }

    private function deleteProductImages(string $id)
    {
        $product = Product::where('id',$id)->get();
        // Delete image files if they exist
        $images = [$product->image1, $product->image2, $product->image3];

        foreach ($images as $image) {
            if (!empty($image)) {
                Storage::delete("public/images/{$image}");
            }
        }
    }
}
