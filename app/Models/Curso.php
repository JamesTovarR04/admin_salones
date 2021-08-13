<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{
    protected $table = 'cursos';

    protected $primaryKey = 'id_curso';

    public static $rules = [
        'nombre' => 'required|string|max:100',
        'profesor' => 'required|string|max:60',
        'descripcion' => 'string',
    ];

    public $timestamps = false;
}
