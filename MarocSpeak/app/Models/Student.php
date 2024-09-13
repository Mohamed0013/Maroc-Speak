<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        "username","level","user_id","course_id"
        ];
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function courses()
    {
        return $this->belongsToMany(Course::class, 'student_course', 'student_id', 'course_id');
    }
    
    public function professors()
    {
        // This relationship is through the courses the student is taking
        return $this->hasManyThrough(Prof::class, Course::class, 'course_id', 'professor_id');
    }
}