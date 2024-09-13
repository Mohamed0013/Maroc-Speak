<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\Prof;
use App\Models\User;
use Illuminate\Http\Request;
use Vonage\Client;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function signup(SignupRequest $request){
        $data = $request->validated();
        /** @var User $user */
        $user = User::query()->create([
            'username' => $data['username'],
            'email' => $data['email'],
            'role' => $data['role'],
            'password' => bcrypt($data['password']),
        ]);

        if ($data['role'] == 'prof') {
            Prof::query()->create([
                'username' => $data['username'],
                'user_id' => $user->id,
            ]);
        }

        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user','token'));
    }

    public function login(LoginRequest $request){
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)){
            return response([
                'message' => 'Provided Email or Password is incorrect'
            ], 422);
        }

        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        if ($user->role == 'admin'){
            // $user->role = 'admin';
            $is_admin = 1;
        } 
        else if ($user->role == 'student'){
            $is_admin = 0;
            $is_student = 1;
        }
        else if ($user->role == 'prof'){
            $is_admin = 0;
            $is_prof = 1;
        }
        else
            $is_admin = 0;

        return response(compact('user','token','is_admin'));
    }

    public function logout(Request $request){
        /** @var User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();

        return response('', 204);
    }
}
