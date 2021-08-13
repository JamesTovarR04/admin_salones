<?php

namespace App\Http\Controllers;

use App\Models\ReservacionSalon;
use App\Models\Salon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReservacionSalonController extends Controller
{
    public function __construct()
    {
        /**
         * Middleware para validacion de reservacion de salon
         * 
         * - Verificar parametros de request
         * - Verificar capacidad del salón
         * - Verificar que no hay cruces de horarios
         */
        $this->middleware(function ($request, $next) {

            $validacion = Validator::make($request->all(), ReservacionSalon::$rules);

            if ($validacion->fails()) {
                return response(['errors' => $validacion->errors()->all()], 422);
            }

            $id_salon = $request->id_salon;
            $tiempo_inicio = $request->inicio;
            $tiempo_fin = $request->fin;
            $num_estudiantes = $request->num_estudiantes;

            $salon = Salon::find($id_salon);

            if ($num_estudiantes > $salon->max_estudiantes) 
            {
                return response(['errors' => 'El número de estudiantes es mayor a la capacidad del salón'], 422);
            }

            $query = '((fecha_hora_inicio <= ? AND fecha_hora_fin > ?) OR (fecha_hora_inicio < ? AND fecha_hora_fin >= ?) OR (fecha_hora_inicio > ? AND fecha_hora_inicio < ?))';

            $cursosCruzados = ReservacionSalon::where('id_salon', $id_salon)
                ->where('id_curso','<>', $request->id_curso)
                ->whereRaw($query, [$tiempo_inicio, $tiempo_inicio, $tiempo_fin, $tiempo_fin, $tiempo_inicio, $tiempo_fin])
                ->get();

            if (count($cursosCruzados) > 0) 
            {
                return response([
                    'errors' => 'existe un cruce de horarios',
                    'cruzados' => $cursosCruzados
                ], 422);
            }

            return $next($request);
        })->only(['store', 'update']);
    }

    /**
     * Lista de reservaciones de un salon.
     *
     * @param  int  $id_salon
     * @return \Illuminate\Http\Response
     */
    public function index($id_salon)
    {
        $reservaciones = ReservacionSalon::where('id_salon',$id_salon)->get();

        return response()->json([
            'data' => $reservaciones,
        ]);
    }

    /**
     * Registrar uso de salon en agenda.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $reservacion = new ReservacionSalon;

        $reservacion->fecha_hora_inicio = $request->inicio;
        $reservacion->fecha_hora_fin = $request->fin;
        $reservacion->num_estudiantes = $request->num_estudiantes;
        $reservacion->id_curso = $request->id_curso;
        $reservacion->id_salon = $request->id_salon;

        $reservacion->save();

        $nombre_curso = $reservacion->curso->nombre;
        $nombre_salon = $reservacion->salon->nombre;

        return response()->json([
            'message' => "El salon $nombre_salon fue reservado para el curso $nombre_curso",
        ], 201);
    }

    /**
     * Muestra una reservacion en especifico
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $reservacion = ReservacionSalon::find($id);

        if (!$reservacion) 
        {
            return response()->json([
                'message' => 'La reservación no existe',
            ], 404);
        }

        return $reservacion;
    }

    /**
     * Actualizar datos de reservacion.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $reservacion = ReservacionSalon::find($id);

        if (!$reservacion) 
        {
            return response()->json([
                'message' => 'La reservacion no existe',
            ], 404);
        }

        $reservacion->fecha_hora_inicio = $request->inicio;
        $reservacion->fecha_hora_fin = $request->fin;
        $reservacion->num_estudiantes = $request->num_estudiantes;
        $reservacion->id_curso = $request->id_curso;
        $reservacion->id_salon = $request->id_salon;

        $reservacion->save();

        return response()->json([
            'message' => "La reservacion $id fue actualizada",
        ], 200);
    }

    /**
     * Eliminar reservacion
     *
     * @param  int  $id_reservacion
     * @return \Illuminate\Http\Response
     */
    public function destroy($id_reservacion)
    {
        $reservacion = ReservacionSalon::find($id_reservacion);

        if (!$reservacion) 
        {
            return response()->json([
                'message' => "La reservación $id_reservacion no existe",
            ], 404);
        }

        $reservacion->delete();

        return response()->json([
            'message' => "Se eliminó la reservación $id_reservacion"
        ], 200);
    }
}
