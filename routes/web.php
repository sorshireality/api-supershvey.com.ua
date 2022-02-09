<?php


use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

//Route::get('/admin', [App\Http\Controllers\Admin::class, 'index'])->middleware(['auth', 'password.confirm']);;;
//Route::get('/admin', ['as' => 'login', 'uses' => 'App\Http\Controllers\Login@show']);
Route::prefix('admin')->group(function () {
    Route::get('/', function () {
        return view('admin.index');
    });
    Route::prefix('products')->group(function () {
        Route::get('/', function () {
            return view('admin.index');
        });
    });
    Route::prefix('orders')->group(function () {
        Route::get('/', function () {
            return view('admin.index');
        });
        Route::get('/create', function () {
            return view('admin.index');
        });
        Route::get('/{id}', fn() => view('admin.index'));
    });
    Route::get('/customers', function () {
        return view('admin.index');
    });
});
//    Route::get('orders', [\App\Http\Controllers\PageController::class, 'showOrders']);
//    Route::post('orders', [\App\Http\Controllers\PageController::class, 'addOrders']);
//
//    Route::get('order-lines', [\App\Http\Controllers\PageController::class, 'showOrderLines']);
//    Route::post('order-lines', [\App\Http\Controllers\PageController::class, 'addOrderLines']);
//
//    Route::get('customers', [\App\Http\Controllers\PageController::class, 'showCustomers']);
//    Route::post('customers', [\App\Http\Controllers\PageController::class, 'addCustomer']);
//
//    Route::get('categories', [\App\Http\Controllers\PageController::class, 'showCategories']);
//    Route::post('categories', [\App\Http\Controllers\PageController::class, 'addCategory']);
//
//    Route::get('attributes', [\App\Http\Controllers\PageController::class, 'showAttributes']);
//    Route::post('attributes', [\App\Http\Controllers\PageController::class, 'addAttributes']);
//
//    Route::get('compositions', [\App\Http\Controllers\PageController::class, 'showCompositions']);
//    Route::post('compositions', [\App\Http\Controllers\PageController::class, 'addCompositions']);
//
//    Route::get('attributes-composition', [\App\Http\Controllers\PageController::class, 'showAttributesComposition']);
//    Route::post('attributes-composition', [\App\Http\Controllers\PageController::class, 'addAttributesComposition']);
//
//
//    Route::get('products', [\App\Http\Controllers\PageController::class, 'showProducts']);
//    Route::post('products', [\App\Http\Controllers\PageController::class, 'addProduct']);
//
//    Route::get('addresses', [\App\Http\Controllers\PageController::class, 'showAddresses']);
//    Route::post('addresses', [\App\Http\Controllers\PageController::class, 'addAddress']);
//
//    Route::get('content', [\App\Http\Controllers\PageController::class, 'showAdmin']);
Route::get('/home', [App\Http\Controllers\Home::class, 'show']);
