<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'cat_name' => $this->cat_name,
            'cat_description' => $this->cat_description,
            // 'cat_image' => $this->cat_image,
            'prof_id' => $this->prof_id,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}
