<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::delete('/orders', [\App\Http\Controllers\OrderController::class, 'delete']);
Route::delete('/customers/{id}', [\App\Http\Controllers\CustomerController::class, 'destroy']);
Route::delete('/products/{id}', [\App\Http\Controllers\ProductController::class, 'destroy']);
Route::delete('/addresses/{id}', [\App\Http\Controllers\AddressController::class, 'destroy']);
Route::delete('/attributes/{id}', [\App\Http\Controllers\AttributesController::class, 'destroy']);
Route::delete('/compositions/{id}', [\App\Http\Controllers\CompositionController::class, 'destroy']);
Route::delete('/attributes-composition/{id}', [\App\Http\Controllers\AttributeCompositionsController::class, 'destroy']);
Route::delete('/order-lines/{id}', [\App\Http\Controllers\OrderLinesController::class, 'destroy']);
Route::get('/compositions/', [\App\Http\Controllers\CompositionController::class, 'index']);
Route::delete('/categories/{id}', [\App\Http\Controllers\CategoryController::class, 'destroy']);
Route::post('/products', [\App\Http\Controllers\ProductController::class, 'store']);
