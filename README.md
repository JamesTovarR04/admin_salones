# Informacion

<p>Un colegio solicita un módulo web, que le permita agenda en sus salones de clases, cursos con su
respectivo profesor y alumnos que asistirán a una fecha y hora en espacio, teniendo disponibilidad
para consultar el histórico por salón resaltando en color verde los cursos previos a la fecha actual
del sistema y en color rojo los cursos posteriores a la fecha actual.</p>

## ¿Que contiene?

- Administrar los salones.
- Administrar los cursos.
- Administrar Agenda del colegio (Salón, Curso, Profesor, x Estudiantes).
- Evitar cruce de horario.
- Reporte histórico por salones con codificación verde/roja.
- Aplicar las validaciones que vea necesarias.

## Instalar y correr (Local)

### Requerido

- [**PHP** *^7.3.0*](https://www.php.net/manual/es/index.php).
- [**MySQL** *^8.0*](https://www.mysql.com/downloads/).
- [**Composer**](https://getcomposer.org/download/).
- [**Git**](https://git-scm.com/downloads).

### Instalar

#### Clonar el Repositorio de git

```shell
git clone https://github.com/JamesTovarR04/soft-usco.git
```

- Moverse a la carpeta del proyecto:

```shell
cd soft-usco
```

#### Descargar las dependencias

```shell
composer install
```

#### Configurar Entorno
La configuración del entorno se hace en el archivo .env pero esé archivo no se puede versionar según las restricciones del archivo .gitignore, igualmente en el proyecto hay un archivo de ejemplo .env.example debemos copiarlo con el siguiente comando:

```shell
cp .env.example .env
```

Luego es necesario modificar los valores de las variables de entorno para adecuar la configuración a nuestro entorno de desarrollo, por ejemplo los parámetros de **conexión a la base de datos**.

#### Generar Clave de Seguridad de la Aplicación

```shell
php artisan key:generate
```

#### Migrar la Base de Datos

El proyecto ya tiene los modelos y migraciones generados. Entonces lo único que nos hace falta es ejecutar la migración y ejecutar el siguiente comando:

```shell
php artisan migrate:fresh
```

#### Correr
Una vez configurada la aplicación, puede iniciar el servidor de desarrollo **local** de Laravel utilizando el comando serve de Artisan CLI:

```shell
php artisan serve
```