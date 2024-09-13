<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        // $this->middleware('auth');
    }

    public function view(User $authenticatedUser, User $user)
    {
        return $authenticatedUser->isAdmin() || $authenticatedUser->id === $user->id;
    }
}
