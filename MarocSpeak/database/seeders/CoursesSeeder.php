<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CoursesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Course::create([
            'title'=>'course1',
            'description' => 'desc',
            'level' => 1,
            'n_phases' => 1,
            'categorie_id' => 1
        ]);
    }
}
