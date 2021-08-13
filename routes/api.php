<?php

use App\Http\Controllers\CursoController;
use App\Http\Controllers\ReservacionSalonController;
use App\Http\Controllers\SalonController;
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

Route::apiResource('salones',SalonController::class);
Route::apiResource('cursos', CursoController::class);
Route::apiResource('reservaciones', ReservacionSalonController::class)->except(['index']);
Route::get('/salones/{id_salon}/reservaciones', [ReservacionSalonController::class,'index']);
