<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <meta name="author" content="Daniel Pascual">
    <meta name="description" content="Una pagina web que gestiona una base de datos">
    <meta name="keywords" content="Database, PHP">
    <title>Ejercicio 6</title>
    <link rel="stylesheet" type="text/css" href="Ejercicio6.css" />
</head>

<body>
    <header>
        <h1>Ejercicio 6</h1>
    </header>
    
    <section>
    <h2> Controles de la Base de Datos </h2>
        <form action="#" method="post" name="operaciones">
           <input type="submit" name="crear" value="Crear Base de Datos" />
               <input type="submit" name="tabla" value="Crear Tabla" />
                <input type="submit" name="insertar" value="Insertar Datos" />
               <input type="submit" name="buscar" value="Buscar Datos" />
               <input type="submit" name="modificar" value="Modificar Datos" />
               <input type="submit" name="eliminar" value="Eliminar Datos" />
                <input type="submit" name="generar" value="Generar Informe" />
               <input type="submit" name="cargar" value="Cargar Datos CSV" />
               <input type="submit" name="exportar" value="Exportar a CSV" />
            </ul>
        </form>
    </section>
    <main>
        <?php
        session_name("database");

        session_start();


        $_SESSION["database"] = new BaseDatos();


        class BaseDatos
        {

            private $user;
            private $tareaword;
            private $host;
            private $db;

            public function __construct()
            {
                $this->user = "DBUSER2021";
                $this->tareaword = "DBPSWD2021";
                $this->host = "localhost";
                $this->db = new mysqli($this->host, $this->user, $this->tareaword);
            }

            private function crearBaseDatos()
            {
                $this->db = new mysqli($this->host, $this->user, $this->tareaword);
                if ($this->db->connect_error) {
                    echo "<p>ERROR de conexión:" . $this->db->connect_error . "</p>";
                    exit();
                } else {
                    echo "<p>Conexión establecida con " . $this->db->host_info . "</p>";
                }

                if ($this->db->query("CREATE DATABASE IF NOT EXISTS Ejercicio6") == TRUE) {
                    echo "<p>Base de datos Ejercicio6 creada con éxito</p>";
                } else {
                    echo "<p>ERROR en la creación de la Base de Datos Ejercicio6, Error: " . $this->db->error . "</p>";
                    exit();
                }
                $this->db->close();
            }

            public function crearTabla()
            {
                $createTable = "CREATE TABLE IF NOT EXISTS PruebasUsabilidad (
                dni VARCHAR (10) NOT NULL,
                nombre VARCHAR (20) NOT NULL,
                apellidos VARCHAR (40) NOT NULL,
                email VARCHAR (40) NOT NULL,
                telefono VARCHAR (20) NOT NULL,
                edad INT UNSIGNED  NOT NULL,
                genero VARCHAR(1) NOT NULL,  CHECK (genero = 'M' OR genero = 'F'),
                nivel INT UNSIGNED NOT NULL,CHECK (nivel >= 0 AND nivel <= 10),
                tiempo DECIMAL(8,2) UNSIGNED NOT NULL,
                tarea VARCHAR(1) NOT NULL, CHECK (tarea = 'S' OR tarea = 'N'), 
                comentarios VARCHAR (255),
                propuestas VARCHAR(255),
                valoracion INT UNSIGNED NOT NULL,CHECK (valoracion >= 0 AND valoracion <= 10),
                PRIMARY KEY(dni)   
            )";

                $this->db->select_db("Ejercicio6");

                if ($this->db->query($createTable) === TRUE) {
                    echo "<p>Tabla PruebasUsabilidad creada</p>";
                } else {
                    echo "<p>ERROR: " . $this->db->error . "</p>";
                }
            }

            public function insertarFormulario()
            {
                echo '
            <h3>Agregar Usuario</h3>
            <form action="#" method="post" name="ins"> 
            
                <p>
                    <label for="dni"> DNI:</label>
                    <input type ="text" id="dni" name="dniIns"/>
                </p>
                <p>
                    <label for="nombre"> Nombre:</label>
                    <input type ="text" id="nombre" name="nombreIns"/>
                </p>
                <p>
                    <label for="apellidos"> Apellidos:</label>
                    <input type ="text" id="apellidos" name="apellidosIns"/>
                </p>
                <p>
                    <label for="emailP"> Email:</label>
                    <input type ="email" id="emailP" name="emailInser"/>
                </p>
                <p>
                    <label for="telefono"> Telefono:</label>
                    <input type ="text" id="telefono" name="telefonoIns"/>
                </p>
                <p>
                    <label for="edad"> Edad:</label>
                    <input type ="text" id="edad" name="edadIns"/>
                </p>
                <p>
                    <label for="genero"> Genero:</label>
                    <select id="genero" name="generoIns">
                        <option value="M">M</option>
                        <option value="F">F</option>
                    </select>
                </p>
                <p>
                    <label for="nivel"> Nivel o pericia:</label>
                    <input type ="number" id="nivel" name="nivelIns"/>
                </p>
                <p>
                    <label for="tiempo"> Tiempo tardado:</label>
                    <input type ="text" id="tiempo" name="tiempoIns"/>
                </p>
                <p>
                    <label for="tarea">Realizado correctamente</label>
                    <input id="tarea" type="checkbox" name="tareaIns" value="SI" >
                </p>
                <p>
                    <label for="comentarios"> Comentarios:</label>
                    <input type ="text" id="comentarios" name="comentariosIns"/>
                </p>
                <p>
                    <label for="propuestas"> Propuestas:</label>
                    <input type ="text" id="propuestas" name="propuestasIns"/>
                </p>
                <p>
                    <label for="valoracion"> Valoracion:</label>
                    <input type ="number" id="valoracion" name="valoracionIns"/>
                </p>
                
                <input type="submit" name="insertarAccion" value="Insertar Usuario"/>

            </form> 
            ';
            }

            public function querys()
            {
                $dni = $_POST["dniIns"];
                $nombre = $_POST["nombreIns"];
                $apellidos = $_POST["apellidosIns"];
                $email = $_POST["emailInser"];
                $telefono = $_POST["telefonoIns"];
                $edad = $_POST["edadIns"];
                $genero = $_POST["generoIns"];
                $nivel = $_POST["nivelIns"];
                $tiempo = $_POST["tiempoIns"];
                $tarea = $_POST["tareaIns"];
                if (isset($tarea)) {
                    $tareaRes = 'S';
                } else {
                    $tareaRes = 'N';
                }
                $comentarios = $_POST["comentariosIns"];
                $propuestas = $_POST["propuestasIns"];
                $valoracion = $_POST["valoracionIns"];

                $this->db->select_db("Ejercicio6");
                $query = $this->db->prepare("INSERT INTO PruebasUsabilidad 
            (dni, nombre, apellidos, email,
            telefono, edad, genero, nivel,
            tiempo, tarea, comentarios,
            propuestas,valoracion)
            values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                $query->bind_param(
                    "sssssisidsssi",

                    $dni,
                    $nombre,
                    $apellidos,
                    $email,
                    $telefono,
                    $edad,
                    $genero,
                    $nivel,
                    $tiempo,
                    $tareaRes,
                    $comentarios,
                    $propuestas,
                    $valoracion
                );

                $query->execute();

                if (strlen($query->error) === 0) {
                    echo "<p>Usuario Insertado</p>";
                } else {
                    echo "<p>" . $query->error . "</p>";
                    $this->insertarFormulario();
                }

                $query->close();
            }
            public function buscarFormulario()
            {

                echo '
                <h3>Buscar Usuario</h3>
                <form action="#" method="post" name="buscarDato"> 
                    <label for="busc"> DNI de la persona:</label>
                    <input type ="text" id="busc" name="dni"/>
                    <input type="submit" name="buscarAccion" value="Buscar Usuario"/>
                </form>
 
            ';
            }
            public function buscarDatos()
            {
                $this->db->select_db("Ejercicio6");
                $query = $this->db->prepare("SELECT * FROM PruebasUsabilidad WHERE dni=?");
                $dni = $_POST["dni"];
                $query->bind_param("s", $dni);
                $query->execute();
                $datos = $query->get_result();

                $datos->data_seek(0);
                while ($row = $datos->fetch_assoc()) {
                    echo '
                <ul>
                    <li>DNI: ' . $row["dni"] . '</li>
                    <li>Nombre: ' . $row["nombre"] . '</li>
                    <li>Apellido: ' . $row["apellidos"] . '</li>
                    <li>Email: ' . $row["email"] . '</li>
                    <li>Telefono: ' . $row["telefono"] . '</li>
                    <li>Edad: ' . $row["edad"] . '</li>
                    <li>Genero: ' . $row["genero"] . '</li>
                    <li>Nivel: ' . $row["nivel"] . '</li>
                    <li>Tiempo: ' . $row["tiempo"] . '</li>
                    <li>Tarea completada: ' . $row["tarea"] . '</li>
                    <li>Comentarios: ' . $row["comentarios"] . '</li>
                    <li>Proposiciones: ' . $row["propuestas"] . '</li>
                    <li>Valoracion: ' . $row["valoracion"] . '</li>
                </ul>

                ';
                }
                $query->close();
                $this->buscarFormulario();
            }


            public function modificarFormulario()
            {
                echo '
            <h3>Modificar Usuario</h3>
            <form action="#" method="post" name="mod"> 
            
            <p>
                <label for="dni"> DNI a quien cambiar:</label>
                <input type ="text" id="dni" name="dniMod"/>
            </p>
            <p>
                <label for="nombre"> Nombre:</label>
                <input type ="text" id="nombre" name="nombreMod"/>
            </p>
            <p>
                <label for="apellidos"> Apellidos:</label>
                <input type ="text" id="apellidos" name="apellidosMod"/>
            </p>
            <p>
                <label for="emailP"> Email:</label>
                <input type ="email" id="emailP" name="emailMod"/>
            </p>
            <p>
                <label for="telefono"> Telefono:</label>
                <input type ="text" id="telefono" name="telefonoMod"/>
            </p>
            <p>
                <label for="edad"> Edad:</label>
                <input type ="text" id="edad" name="edadMod"/>
            </p>
            <p>
                <label for="genero"> Genero:</label>
                <select id="genero" name="generoMod">
                    <option value="M">M</option>
                    <option value="F">F</option>
                </select>
            </p>
            <p>
                <label for="nivel"> Nivel o pericia:</label>
                <input type ="number" id="nivel" name="nivelMod"/>
            </p>
            <p>
                <label for="tiempo"> Tiempo tardado:</label>
                <input type ="text" id="tiempo" name="tiempoMod"/>
            </p>
            <p>
                <label for="tarea">Realizado correctamente</label>
                <input id="tarea" type="checkbox" name="tareaMod" value="SI" >
            </p>
            <p>
                <label for="comentarios"> Comentarios:</label>
                <input type ="text" id="comentarios" name="comentariosMod"/>
            </p>
            <p>
                <label for="propuestas"> Propuestas:</label>
                <input type ="text" id="propuestas" name="propuestasMod"/>
            </p>
            <p>
                <label for="valoracion"> Valoracion:</label>
                <input type ="number" id="valoracion" name="valoracionMod"/>
            </p>
            <input type="submit" name="modificarAccion" value="Modificar Usuario"/>

        </form> 
            ';
            }

            public function modificarDatos()
            {

                $dni = $_POST["dniMod"];
                $nombre = $_POST["nombreMod"];
                $apellidos = $_POST["apellidosMod"];
                $email = $_POST["emailMod"];
                $telefono = $_POST["telefonoMod"];
                $edad = $_POST["edadMod"];
                $genero = $_POST["generoMod"];
                $nivel = $_POST["nivelMod"];
                $tiempo = $_POST["tiempoMod"];
                $tarea = $_POST["tareaMod"];
                if (isset($tarea)) {
                    $tareaRes = 'S';
                } else {
                    $tareaRes = 'N';
                }
                $comentarios = $_POST["comentariosMod"];
                $propuestas = $_POST["propuestasMod"];
                $valoracion = $_POST["valoracionMod"];


                $this->db->select_db("Ejercicio6");

                $query =  $this->db->prepare("SELECT * FROM PruebasUsabilidad WHERE dni=?");
                $query->bind_param("s", $dni);
                $query->execute();

                $result = $query->get_result();
                $result->data_seek(0);

                if ($result->fetch_assoc() != NULL) {
                    $this->db->select_db("Ejercicio6");
                    $query2 = $this->db->prepare("UPDATE PruebasUsabilidad 
                SET nombre = ?, apellidos = ?, email = ?, telefono = ?,
                 edad = ?, genero = ?, nivel = ?, tiempo = ?, tarea = ?,
                 comentarios = ?, propuestas = ?, valoracion = ? WHERE dni = ?");
                    $query2->bind_param(
                        "sssiisidsssis",
                        $nombre,
                        $apellidos,
                        $email,
                        $telefono,
                        $edad,
                        $genero,
                        $nivel,
                        $tiempo,
                        $tareaRes,
                        $comentarios,
                        $propuestas,
                        $valoracion,
                        $dni,
                    );

                    $query2->execute();

                    if (strlen($query2->error) === 0) {
                        echo "<p>Usuario Modificado </p>";
                    } else {
                        echo "<p> ERROR: " . $query2->error . "</p>";
                    }
                    $query2->close();
                } else {
                    echo '<p>Usuario no encontrado.</p>';
                    $this->modificarFormulario();
                }
                $query->close();
            }

            public function eliminarFormulario()
            {

                echo '
                <h3>Eliminar Usuario</h3>
                <form action="#" method="post" name="eliminarDato"> 
                    <label for="eli"> DNI de la persona:</label>
                    <input type ="text" id="eli" name="dni"/>
                    <input type="submit" name="eliminarAccion" value="Eliminar Usuario"/>
                </form>
 
            ';
            }
            public function eliminarDatos()
            {
                $this->db->select_db("Ejercicio6");
                $dni = $_POST["dni"];

                $query =  $this->db->prepare("SELECT * FROM PruebasUsabilidad WHERE dni=?");
                $query->bind_param("s", $dni);
                $query->execute();

                $result = $query->get_result();
                $result->data_seek(0);

                if ($result->fetch_assoc() !== NULL) {
                    $query2 = $this->db->prepare("DELETE FROM PruebasUsabilidad WHERE dni=?");
                    $query2->bind_param("s", $dni);
                    $query2->execute();
                    $query2->close();
                    echo '<p>Usuario eliminado</p>';
                } else {
                    echo '<p>Usuario no encontrado.</p>';
                    $this->eliminarFormulario();
                }
                $query->close();
            }
            public function generarInforme()
            {
                $print = "<h3>Informe</h3>";
                $this->db->select_db("Ejercicio6");

                //Calcuar Edad Media

                $query = $this->db->prepare("SELECT AVG(edad) AS media FROM PruebasUsabilidad");
                $query->execute();
                $edadMedia = $query->get_result();
                $result = $edadMedia->fetch_assoc();
                $print .= "<p>Edad media: " . $result["media"] . "</p>";
                $query->close();

                //Frecuencia del % de cada tipo de sexo entre los usuarios

                $querytotal = $this->db->prepare("SELECT COUNT(*) AS total  FROM PruebasUsabilidad");
                $querytotal->execute();
                $numeroTotal = $querytotal->get_result();
                $resultTotal = $numeroTotal->fetch_assoc();
                $query = $this->db->prepare("SELECT COUNT(*) AS hombres FROM PruebasUsabilidad WHERE genero = ?");
                $gen = "M";
                $query->bind_param("s",  $gen);
                $query->execute();
                $hombresTotal = $query->get_result();
                $resultHombres = $hombresTotal->fetch_assoc();
                if ($resultTotal["total"] > 0) {
                    $total = $resultTotal["total"];
                    $mujeres = (($resultTotal["total"] - $resultHombres["hombres"]) / $resultTotal["total"]) * 100;
                    $hombres = ($resultHombres["hombres"] / $resultTotal["total"]) * 100;
                } else {
                    $total = 0;
                    $mujeres = 0;
                    $hombres = 0;
                }
                $query->close();
                $querytotal->close();
                $print .= "<p>Porcentaje de hombres: " . $hombres . "%</p>";
                $print .= "<p>Porcentaje de mujeres: " . $mujeres . "%</p>";

                // Valor medio del nivel o pericia informática de los usuarios

                $query = $this->db->prepare("SELECT AVG(nivel) AS media FROM PruebasUsabilidad");
                $query->execute();
                $media = $query->get_result();
                $result = $media->fetch_assoc();
                $query->close();
                $print .= "<p>Nivel medio: " . $result["media"] . "</p>";

                // Tiempo medio para la tarea

                $query = $this->db->prepare("SELECT AVG(tiempo) AS media FROM PruebasUsabilidad");
                $query->execute();
                $media = $query->get_result();
                $result = $media->fetch_assoc();
                $query->close();
                $print .= "<p>Tiempo medio: " . $result["media"] . "</p>";


                // Porcentaje de usuarios que han realizado la tarea correctamente
                // $total
                $query = $this->db->prepare("SELECT COUNT(*) AS correctos FROM PruebasUsabilidad WHERE tarea = ?");
                $par = "S";
                $query->bind_param("s", $par);
                $query->execute();
                $correctos = $query->get_result();
                $result = $correctos->fetch_assoc();
                $query->close();
                $porceta = ($result["correctos"] / $total) * 100;
                $print .= "<p>Porcentaje de usuarios que han realizado la tarea correctamente: " . $porceta . "%</p>";

                //Valor medio de la puntuación de los usuarios sobre la aplicación
                $query = $this->db->prepare("SELECT AVG(valoracion) AS media FROM PruebasUsabilidad");
                $query->execute();
                $media = $query->get_result();
                $result = $media->fetch_assoc();
                $query->close();
                $print .= "<p>Valor medio de la puntuación de los usuarios sobre la aplicación: " . $result["media"] . "</p>";

                echo $print;
            }


            public function cargar()
            {

                $csv = fopen("pruebasUsabilidad.csv", "r");
                $counter = 0;
                while (!feof($csv)) {

                    $row = fgetcsv($csv, 100, ";");
                    if ($row != false) {
                        try {
                            $dni = $row[0];
                            $nombre = $row[1];
                            $apellidos = $row[2];
                            $email = $row[3];
                            $telefono = $row[4];
                            $edad = $row[5];
                            $genero = $row[6];
                            $nivel = $row[7];
                            $tiempo = $row[8];
                            $tarea = $row[9];
                            $comentarios = $row[10];
                            $propuestas = $row[11];
                            $valoracion = $row[12];
                            $this->db->select_db("Ejercicio6");
                            $query = $this->db->prepare("INSERT INTO PruebasUsabilidad 
                    (dni, nombre, apellidos, email, telefono, 
                    edad, genero, nivel, tiempo, tarea, 
                    comentarios, propuestas, valoracion)
                    values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                            $query->bind_param(
                                "ssssiisidsssi",
                                $dni,
                                $nombre,
                                $apellidos,
                                $email,
                                $telefono,
                                $edad,
                                $genero,
                                $nivel,
                                $tiempo,
                                $tarea,
                                $comentarios,
                                $propuestas,
                                $valoracion
                            );
                            $query->execute();
                            $query->close();
                        } catch (Exception $e) {
                            echo "<p>Error al insertar en fila " . $counter . "</p>";
                        }
                        $counter++;
                    }

                    if ($counter >= 0) {
                        echo "<p>" . $counter . " usuarios insertados</p>";
                    } else {
                        echo "<p>No se pudo insertar nada</p>";
                    }
                }
            }

            public function exportar()
            {
                try {
                    $this->db->select_db("Ejercicio6");
                    $datos = $this->db->prepare("SELECT * FROM PruebasUsabilidad");
                    $datos->execute();
                    $result = $datos->get_result();
                    $result->data_seek(0);

                    $csv = fopen("pruebasUsabilidad.csv", "w");

                    while ($row = $result->fetch_assoc()) {
                        fputcsv($csv, $row, ";");
                    }

                    fclose($csv);
                    $result->close();
                    echo "<p>La base de datos ha sido exportada a csv</p>";
                } catch (Exception $e) {
                    echo "<p>Error al Exportar</p>";
                }
            }

            public function responderPeticion()
            {
                if (isset($_POST["crear"])) $this->crearBaseDatos();
                if (isset($_POST["tabla"])) $this->crearTabla();
                if (isset($_POST["insertar"])) $this->insertarFormulario();
                if (isset($_POST["insertarAccion"])) $this->querys();
                if (isset($_POST["buscar"])) $this->buscarFormulario();
                if (isset($_POST["buscarAccion"])) $this->buscarDatos();
                if (isset($_POST["modificar"])) $this->modificarFormulario();
                if (isset($_POST["modificarAccion"])) $this->modificarDatos();
                if (isset($_POST["eliminar"])) $this->eliminarFormulario();
                if (isset($_POST["eliminarAccion"])) $this->eliminarDatos();
                if (isset($_POST["generar"])) $this->generarInforme();
                if (isset($_POST["cargar"])) $this->cargar();
                if (isset($_POST["exportar"])) $this->exportar();
            }
        }



        if (count($_POST) > 0) {
            $_SESSION["database"]->responderPeticion();
        }

        ?>
    </main>
    <footer>
        Hecho por Daniel Pascual Lopez - UO269728
    </footer>
</body>

</html>