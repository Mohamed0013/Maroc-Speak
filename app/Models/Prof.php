<?php

namespace App\Models;

use App\Models\Exercise;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Prof extends Model
{
    use HasFactory;

    protected $fillable = [
        "username","review","user_id","course_id","student_id","categorie_id"
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function courses()
    {
        return $this->hasMany(Course::class, 'prof_id');
    }

    public function students()
    {
        return $this->hasManyThrough(Student::class, Course::class, 'prof_id', 'course_id');
    }

    public function exercise()
    {
        return $this->hasMany(Exercise::class, 'exercice_id');
    }

    public function categories()
    {
        return $this->hasMany(Categorie::class, 'prof_id');
    }
}
