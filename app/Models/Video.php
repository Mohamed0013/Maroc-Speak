<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    use HasFactory;

    protected $fillable = [
        "video1","video2","video3","video4","video5","video6"
        ,"video7","video8","video9","video10","chapter_id",
    ];
}
