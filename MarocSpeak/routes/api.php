<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AdmProductController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\OneUserController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ProfCategories;
use App\Http\Controllers\Api\ProfCoursesController;
use App\Http\Controllers\Api\SendSmsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware(['auth:sanctum', 'admin'])->group(function(){
    Route::get('/admin', function (Request $request) {
        return $request->user();
    });
 
    Route::apiResource('/admusers', AdminController::class);

    Route::apiResource('/admproduct',AdmProductController::class);
    Route::delete('/deleteimage',[AdmProductController::class], 'deleteProductImages');
    
    
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    Route::post('/logout', [AuthController::class,'logout']);

    Route::apiResource('/users',OneUserController::class);

    Route::apiResource('/profcategory', ProfCategories::class);

    Route::apiResource('/profcourse', ProfCoursesController::class);

    Route::get('/prof/search/categories', [ProfCategories::class,'searchCategories']);

    Route::get('/prof/mycourses', [ProfCoursesController::class,'getMyCourses']);
    
});

Route::post('/signup', [AuthController::class,'signup']);

Route::post('/login', [AuthController::class,'login']); 


// Route::get('/verification', [SendSmsController::class, 'sms']);