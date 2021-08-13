<?php

namespace App\Http\Controllers;

use App\Models\Salon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SalonController extends Controller
{
    /**
     * Mostrar lista de salones.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $validacion = Validator::make($request->all(),[
            'buscar' => 'string|max:20'
        ]);

        if($validacion->fails())
        {
            return response(['errors' => $validacion->errors()->all()], 422);
        }

        if($request->buscar == '')
        {
            $salones = Salon::all();
        }else
        {
            $salones = Salon::where('nombre','like',$request->buscar.'%')->get();
        }

        return response()->json([
            'data' => $salones
        ]);
    }

    /**
     * Guardar un nuevo salon.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validacion = Validator::make($request->all(),Salon::$rules);

        if($validacion->fails())
        {
            return response(['errors' => $validacion->errors()->all()], 422);
        }

        $salon = new Salon;

        $salon->nombre = $request->nombre;
        $salon->max_estudiantes = $request->max_estudiantes;

        $salon->save();

        return response()->json([
            'message' => "El salon $request->nombre fue registrado con exito",
        ],201);
    }

    /**
     * Mostrar un salon en especifico.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $salon = Salon::find($id);

        if (!$salon)
        {
            return response()->json([
                'message' => 'El salón no existe',
            ],404);
            
        }

        return $salon;
    }

    /**
     * Actualizar datos de un salon.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validacion = Validator::make($request->all(),Salon::$rules);

        if($validacion->fails())
        {
            return response(['errors' => $validacion->errors()->all()], 422);
        }

        $salon = Salon::find($id);

        if (!$salon)
        {
            return response()->json([
                'message' => 'El salón no existe',
            ],404);
            
        }

        $salon->nombre = $request->nombre;
        $salon->max_estudiantes = $request->max_estudiantes;

        $salon->save();

        return response()->json([
            'message' => "El salon $request->nombre fue actualizado",
        ],200);
    }

    /**
     * Eliminar un salon.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $salon = Salon::find($id);

        if (!$salon)
        {
            return response()->json([
                'message' => 'El salón no existe',
            ],404);
            
        }

        $nombre_salon = $salon->nombre;
        $salon->delete();

        return response()->json([
            'message' => "El salón $nombre_salon fue eliminado",
        ],200);
    }
}
