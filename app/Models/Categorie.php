<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    use HasFactory;

    protected $fillable = [
        "cat_name", "cat_description","prof_id","created_at"
    ];

    public function prof()
    {
        return $this->belongsTo(Prof::class, 'prof_id');
    }
}
