<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CursoController extends Controller
{
    /**
     * Mostrar lista de cursos
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $validacion = Validator::make($request->all(), [
            'buscar' => 'string|max:20'
        ]);

        if ($validacion->fails()) 
        {
            return response(['errors' => $validacion->errors()->all()], 422);
        }

        if ($request->buscar == '') 
        {
            $cursos = Curso::all();
        }else 
        {
            $cursos = Curso::where('nombre', 'like', $request->buscar . '%')->get();
        }

        return response()->json([
            'data' => $cursos
        ]);
    }

    /**
     * Guardar un nuevo curso.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validacion = Validator::make($request->all(), Curso::$rules);

        if ($validacion->fails())
        {
            return response(['errors' => $validacion->errors()->all()], 422);
        }

        $curso = new Curso;

        $curso->nombre = $request->nombre;
        $curso->profesor = $request->profesor;
        $curso->descripcion = $request->descripcion;

        $curso->save();

        return response()->json([
            'message' => "El curso de $request->nombre fue registrado con exito",
        ], 201);
    }

    /**
     * Mostrar un curso en especifico.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $curso = Curso::find($id);

        if (!$curso) 
        {
            return response()->json([
                'message' => 'El curso no existe',
            ], 404);
        }

        return $curso;
    }

    /**
     * Actualizar datos de un curso.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validacion = Validator::make($request->all(), Curso::$rules);

        if ($validacion->fails()) 
        {
            return response(['errors' => $validacion->errors()->all()], 422);
        }

        $curso = curso::find($id);

        if (!$curso) 
        {
            return response()->json([
                'message' => 'El curso no existe',
            ], 404);
        }

        $curso->nombre = $request->nombre;
        $curso->profesor = $request->profesor;
        $curso->descripcion = $request->descripcion;

        $curso->save();

        return response()->json([
            'message' => "El curso $request->nombre fue actualizado",
        ], 200);
    }

    /**
     * Eliminar un curso.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $curso = Curso::find($id);

        if (!$curso)
        {
            return response()->json([
                'message' => 'El curso no existe',
            ], 404);
        }

        $nombre_curso = $curso->nombre;
        $curso->delete();

        return response()->json([
            'message' => "El curso $nombre_curso fue eliminado",
        ], 200);
    }
}
