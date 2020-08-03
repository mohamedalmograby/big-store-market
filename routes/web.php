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

Route::post('/api/login', 'UserController@login');
Route::post('/api/register', 'UserController@register');
Route::post('/api/upload-file', 'ProductController@uploadFile');

Route::get('/api//products', 'ProductController@index');
Route::get('/api//products/{product}', 'ProductController@show');

Route::group(['middleware' => 'auth:api'], function(){
    Route::get('/api//users' , 'UserController@index');
    Route::get('/api/users/{user}/orders','UserController@showOrders');
    Route::patch('/api/orders/{order}/deliver' , 'OrderController@deliverOrder');
    Route::resource('/api/products', 'ProductController')->except(['index','show']);
    Route::resource('/api/orders' , 'OrderController');
});


Route::get('/lol' , function(){
    return 'lol' ; 
}) ; 
Route::get('/{any}', function(){
    return view('landing');
})->where('any', '.*');