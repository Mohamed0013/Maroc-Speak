<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => '',
            'description' => '',
            'image1' => '',
            'image2' => '',
            'image3' => '',
            'image4' => '',
            'price' => '',
            'pre_price' => '',
            'qte' => '',
            'discount' => '',
            'brand' => ''
        ];
    }
}
