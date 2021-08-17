<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReservacionesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservaciones', function (Blueprint $table) {
            $table->id('id_reservacion');
            $table->dateTime('fecha_hora_inicio', $precision = 0);
            $table->dateTime('fecha_hora_fin', $precision = 0);
            $table->unsignedInteger('num_estudiantes');

            $table->foreignId('id_curso')
                ->references('id_curso')
                ->on('cursos')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreignId('id_salon')
                ->references('id_salon')
                ->on('salones')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reservaciones');
    }
}
