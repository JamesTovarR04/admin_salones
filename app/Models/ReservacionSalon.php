<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReservacionSalon extends Model
{
    protected $table = 'reservaciones';

    protected $primaryKey = 'id_reservacion';

    public static $rules = [
        'inicio' => 'required|date_format:Y-m-d H:i',
        'fin' => 'required|date_format:Y-m-d H:i|after:inicio',
        'num_estudiantes' => 'required|integer',
        'id_curso' => 'required|exists:cursos',
        'id_salon' => 'required|exists:salones',
    ];

    public $timestamps = false;

    public function curso()
    {
        return $this->belongsTo(Curso::class, 'id_curso');
    }

    public function salon()
    {
        return $this->belongsTo(Salon::class, 'id_salon');
    }
}
