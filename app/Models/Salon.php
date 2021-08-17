<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Salon extends Model
{
    protected $table = 'salones';

    protected $primaryKey = 'id_salon';

    public static $rules = [
        'nombre' => 'required|string|unique:salones,nombre|max:45',
        'max_estudiantes' => 'required|Integer',
    ];

    public $timestamps = false;
}
