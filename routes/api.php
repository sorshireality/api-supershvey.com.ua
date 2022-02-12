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

/** Orders */
Route::get('/orders', [\App\Http\Controllers\OrderController::class, 'index']);
Route::get('/orders/{id}', [\App\Http\Controllers\OrderController::class, 'show']);
Route::get('/orders/{id}/order-lines', [\App\Http\Controllers\OrderController::class, 'showOrderLines']);
Route::post('/orders', [\App\Http\Controllers\OrderController::class, 'store']);
Route::delete('/orders/{id}', [\App\Http\Controllers\OrderController::class, 'destroy']);

/** Customers */
Route::delete('/customers/{id}', [\App\Http\Controllers\CustomerController::class, 'destroy']);
Route::get('/customers/{id}', [\App\Http\Controllers\CustomerController::class, 'show']);
Route::get('/customers/{id}/orders', [\App\Http\Controllers\CustomerController::class, 'showOrders']);
Route::get('/customers/', [\App\Http\Controllers\CustomerController::class, 'index']);
Route::post('/customers/', [\App\Http\Controllers\CustomerController::class, 'store']);

/** Products */
Route::delete('/products/{id}', [\App\Http\Controllers\ProductController::class, 'destroy']);
Route::get('/products/{id}', [\App\Http\Controllers\ProductController::class, 'show']);
Route::get('/products', [\App\Http\Controllers\ProductController::class, 'index']);
Route::post('/products', [\App\Http\Controllers\ProductController::class, 'store']);

/** Addresses */
Route::delete('/addresses/{id}', [\App\Http\Controllers\AddressController::class, 'destroy']);
Route::post('/addresses', [\App\Http\Controllers\AddressController::class, 'store']);
Route::get('/addresses', [\App\Http\Controllers\AddressController::class, 'index']);
Route::get('/addresses/{id}', [\App\Http\Controllers\AddressController::class, 'show']);

/** Attributes */
Route::delete('/attributes/{id}', [\App\Http\Controllers\AttributesController::class, 'destroy']);
Route::get('/attributes/{id}', [\App\Http\Controllers\AttributesController::class, 'show']);
Route::get('/attributes', [\App\Http\Controllers\AttributesController::class, 'index']);
Route::post('/attributes', [\App\Http\Controllers\AttributesController::class, 'store']);

/** Compositions */
Route::delete('/compositions/{id}', [\App\Http\Controllers\CompositionController::class, 'destroy']);
Route::get('/compositions', [\App\Http\Controllers\CompositionController::class, 'index']);
Route::get('/compositions/{id}', [\App\Http\Controllers\CompositionController::class, 'show']);
Route::post('/compositions', [\App\Http\Controllers\CompositionController::class, 'store']);

/** Attribute Composition */
Route::delete('/attributes-composition/{id}', [\App\Http\Controllers\AttributeCompositionsController::class, 'destroy']);
Route::get('/attributes-composition/{id}', [\App\Http\Controllers\AttributeCompositionsController::class, 'show']);
Route::get('/attributes-composition', [\App\Http\Controllers\AttributeCompositionsController::class, 'index']);
Route::post('/attributes-composition', [\App\Http\Controllers\AttributeCompositionsController::class, 'store']);

/** Order Lines */
Route::delete('/order-lines/{id}', [\App\Http\Controllers\OrderLinesController::class, 'destroy']);
Route::get('/order-lines/{id}', [\App\Http\Controllers\OrderLinesController::class, 'show']);
Route::get('/order-lines', [\App\Http\Controllers\OrderLinesController::class, 'index']);
Route::post('/order-lines', [\App\Http\Controllers\OrderLinesController::class, 'store']);

/** Categories */
Route::delete('/categories/{id}', [\App\Http\Controllers\CategoryController::class, 'destroy']);
Route::get('/categories/{id}', [\App\Http\Controllers\CategoryController::class, 'show']);
Route::get('/categories', [\App\Http\Controllers\CategoryController::class, 'index']);
Route::post('/categories', [\App\Http\Controllers\CategoryController::class, 'store']);
