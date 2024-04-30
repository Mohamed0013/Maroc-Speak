<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\OneuserResource;
use App\Http\Resources\UserResource;

class OneUserController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth'); 
    } 
    
    /** 
     * Display a listing of the resource.
     * @return AnonymousResourceCollection
     */ 
    public function index()
    {
        return OneuserResource::collection(
            User::query()->OrderBy('id','desc')->paginate(10)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validated();

        $data['password'] = bcrypt($data['password']);
        $user = User::create($data);
        
        return response(new OneuserResource($user), 201);
    }

    /**
     * Display the specified resource.  
     */
    public function show(User $user)
    {
        $authenticatedUser = auth()->user();

        // if ($authenticatedUser && $authenticatedUser->id === $user->id) {
            $this->authorize('view', $user);
            // Fetch user data and return
            return new OneuserResource($user);
        // }

        // return response()->json(['error' => 'Unauthorized.'], 403);
    }
 
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();

        if(isset($data['password'])){
            $data['password'] = bcrypt($data['password']);
        }

        $user->update($data);

        return new OneuserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response("", 204);
    }
}
