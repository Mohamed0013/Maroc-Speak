<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'username' => 'Mohamed',
            'email' => 'Med13@gmail.com',
            'password' => Hash::make('Simoox029@##'),
            'role' => 'student',

        ]);
    }
}
