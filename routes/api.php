<?php

use App\Http\Controllers\UserController;
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

Route::post('login', 'UserController@login');
Route::post('register', 'UserController@register');
Route::post('/upload-file', 'ProductController@uploadFile');

Route::get('/products', 'ProductController@index');
Route::get('/products/{product}', 'ProductController@show');

Route::group(['middleware' => 'auth:api'], function(){
    Route::get('/users' , 'UserController@index');
    Route::get('/users/{user}/orders','UserController@showOrders');
    Route::patch('/orders/{order}/deliver' , 'OrderController@deliverOrder');
    Route::resource('/products', 'ProductController')->except(['index','show']);
    Route::resource('/orders' , 'OrderController');
});