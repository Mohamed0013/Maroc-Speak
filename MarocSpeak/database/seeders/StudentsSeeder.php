<?php

namespace Database\Seeders;

use App\Models\Student;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StudentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Student::create([
            'username' => 'Mohamed',
            'level' => '12',
            'user_id' => 1,
            'course_id' => 1,


            // "username","level","user_id","course_id"
        ]);
    }
}
