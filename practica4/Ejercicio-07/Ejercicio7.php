<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <meta name="author" content="Daniel Pascual">
    <meta name="description" content="Una pagina web que gestiona una base de datos de un cine">
    <meta name="keywords" content="Database, PHP,Cine">
    <title>Ejercicio 7</title>
    <link rel="stylesheet" type="text/css" href="Ejercicio7.css" />
</head>

<body>
    <header>
        <h1>Cine el Mono del SOL</h1>
    </header>
    
    <section>
    <h2>Administrar Cartelera: </h2>
        <form action="#" method="post" name="operaciones">

            <input type="submit" name="addFilm" value="Insertar Pelicula" />
            <input type="submit" name="addCompany" value="Insertar Compania" />
            <input type="submit" name="addDirector" value="Insertar Director" />
            <input type="submit" name="verPeliculas" value="Ver Peliculas" />
        </form>
    </section>
    <main>

        <?php
        session_name("database");

        session_start();


        $_SESSION["database"] = new Cine();


        class Cine
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

                $this->crearBaseDatos();
                $this->crearTabla();
            }

            private function crearBaseDatos()
            {
                $this->db = new mysqli($this->host, $this->user, $this->tareaword);
                // if ($this->db->connect_error) {
                //     echo "<p>ERROR de conexión:" . $this->db->connect_error . "</p>";
                //     exit();
                // } else {
                //     echo "<p>Conexión establecida con " . $this->db->host_info . "</p>";
                // }

                // if ($this->db->query("CREATE DATABASE IF NOT EXISTS Ejercicio7") == TRUE) {
                //     echo "<p>Base de datos Ejercicio7 creada con éxito</p>";
                // } else {
                //     echo "<p>ERROR en la creación de la Base de Datos Ejercicio7, Error: " . $this->db->error . "</p>";
                //     exit();
                // }
            }

            public function crearTabla()
            {
                $this->db->select_db("Ejercicio7");

                $createTable = "CREATE TABLE IF NOT EXISTS COMPANIA (
                    id VARCHAR(10) NOT NULL,
                    nombre VARCHAR(100) NOT NULL,
                    direccion VARCHAR(100) NOT NULL,
                    PRIMARY KEY(id)

                )";
                $this->db->query($createTable);
                // if ($this->db->query($createTable) === TRUE) {
                //     echo "<p>Tabla COMPANIA creada</p>";
                // } else {
                //     echo "<p>ERROR: " . $this->db->error . "</p>";
                // }

                $createTable = "CREATE TABLE IF NOT EXISTS Pelicula (
                 id VARCHAR(10) NOT NULL,
                 titulo VARCHAR(50) NOT NULL,
                 argumento VARCHAR(255) NOT NULL,
                 categoria VARCHAR(40) NOT NULL,
                 duracion DECIMAL(10,2) NOT NULL,
                 fecha DATE NOT NULL,
                 id_compania VARCHAR(10) NOT NULL,
                 PRIMARY KEY(id),
                 FOREIGN KEY (id_compania) REFERENCES COMPANIA(id) 
                    )";


                $this->db->query($createTable);
                // if ($this->db->query($createTable) === TRUE) {
                //     echo "<p>Tabla Pelicula creada</p>";
                // } else {
                //     echo "<p>ERROR: " . $this->db->error . "</p>";
                // }

                $createTable = "CREATE TABLE IF NOT EXISTS Director (
                id VARCHAR(10) NOT NULL,
                nombre VARCHAR(100) NOT NULL,
                fechaNacimiento DATE NOT NULL,
               PRIMARY KEY(id)   
            )";
                $this->db->query($createTable);


                // if ($this->db->query($createTable) === TRUE) {
                //     echo "<p>Tabla Director creada</p>";
                // } else {
                //     echo "<p>ERROR: " . $this->db->error . "</p>";
                // }
                $createTable = "CREATE TABLE IF NOT EXISTS DIRECCION (
                    id_pelicula VARCHAR(10) NOT NULL,
                    id_director VARCHAR(10) NOT NULL,
                    PRIMARY KEY (id_pelicula, id_director),
                    FOREIGN KEY (id_pelicula) REFERENCES Pelicula(id),
                    FOREIGN KEY (id_director) REFERENCES Director(id) 
                )";
                $this->db->query($createTable);
                // if ($this->db->query($createTable) === TRUE) {
                //     echo "<p>Tabla DIRECCION creada</p>";
                // } else {
                //     echo "<p>ERROR: " . $this->db->error . "</p>";
                // }
            }


            public function insertarFormularioComp()
            {
                echo '
                <h3>Agregar Compania</h3>
                <form action="#" method="post" name="ins"> 
                    <p>
                        <label for="id"> ID:</label>
                        <input type ="text" id="id" name="idCompa"/>
                    </p>
                    <p>
                        <label for="nombre"> Nombre:</label>
                        <input type ="text" id="nombre" name="nombreCompa"/>
                    </p>
                    <p>
                        <label for="direccion"> Direccion:</label>
                        <input type ="text" id="direccion" name="dirCompa"/>
                    </p>
                    <p>
                    <input type="submit" name="insertarCompAccion" value="Insertar Compania"/>
                    </p>
                    <p>
                    <input type="submit" name="fileCompAccion" value="Cargar archivo Companias"/>
                    </p>
                </form> 
                ';
            }
            public function insertarFormularioPeli()
            {
                echo '
                <h3>Agregar Pelicula</h3>
                <form action="#" method="post" name="ins"> 
                    <p>
                        <label for="id"> ID:</label>
                        <input type ="text" id="id" name="idPeli"/>
                    </p>
                    <p>
                        <label for="titulo"> Titulo:</label>
                        <input type ="text" id="titulo" name="tituloPeli"/>
                    </p>
                    <p>
                        <label for="categoria"> Categoria:</label>
                        <input type ="text" id="categoria" name="categoriaPeli"/>
                    </p>
                    <p>
                        <label for="argumento"> Argumento:</label>
                        <input type ="text" id="argumento" name="argumentoPeli"/>
                    </p>
                    <p>
                        <label for="duracion"> Duracion:</label>
                        <input type ="text" id="duracion" name="duracionPeli"/>
                    </p>
                    <p>
                        <label for="fecha"> Fecha:</label>
                        <input type ="date" id="fecha" name="fechaPeli"/>
                    </p>
                    <p>
                    <label for="id_compania"> ID Compania:</label>
                        <input type ="text" id="id_compania" name="compaPeli"/>
                    </p>
                    <p>
                    <input type="submit" name="insertarPeliAccion" value="Insertar Pelicula"/>
                    </p>
                    <p>
                    <input type="submit" name="filePeliAccion" value="Cargar Archivo Peliculas"/>
                    </p>
                </form> 
                ';
            }
            public function insertarFormularioDirector()
            {
                echo '
                <h3>Agregar Director</h3>
                <form action="#" method="post" name="ins"> 
                    <p>
                        <label for="id"> ID:</label>
                        <input type ="text" id="id" name="idDir"/>
                    </p>
                    <p>
                        <label for="nombre"> Nombre:</label>
                        <input type ="text" id="nombre" name="nombreDir"/>
                    </p>
                    <p>
                        <label for="fechaNaz"> Fecha Nacimiento:</label>
                        <input type ="date" id="fechaNaz" name="fechaDir"/>
                    </p>
                    <p>
                        <label for="idPel"> Id Pelicula:</label>
                        <input type ="text" id="idPel" name="idPelDir"/>
                    </p>

                    <p>
                    <input type="submit" name="insertarDirecAccion" value="Insertar Director"/>
                    </p>
                    <p>
                    <input type="submit" name="fileDirectorAccion" value="Cargar archivo Directores"/>
                    </p>
        
                </form> 
                ';
            }
            public function addCompania()
            {
                $id = $_POST["idCompa"];
                $nombre = $_POST["nombreCompa"];
                $direccion = $_POST["dirCompa"];

                $this->db->select_db("Ejercicio7");
                $query = $this->db->prepare("INSERT INTO Compania 
                (id, nombre, direccion)
                values (?, ?, ?)");
                $query->bind_param(
                    "sss",
                    $id,
                    $nombre,
                    $direccion
                );
                $query->execute();
                if (strlen($query->error) === 0) {
                    echo "<p>Usuario Insertado</p>";
                } else {
                    echo "<p>" . $query->error . "</p>";
                }

                $query->close();
            }
            public function cargarFormCompania()
            {
                echo "
                <h3>Cargar Compania</h3>
                <form action='#' method='post' enctype='multipart/form-data'>
                    <p>
                        <label for='archComp'> Archivo a cargar desde la máquina cliente</label>
                        <input id = 'archComp'type='file' name='archivo'/>
                    </p>
                    <p>
                        <input type='submit' name = 'cargarCompAccion' value='Cargar'/>
                    </p>
                </form>

                ";
            }
            public function cargarCompania()
            {



                
                $fp = fopen($_FILES['archivo']['tmp_name'], 'rb');
                $counter = 0;
                while (($row = fgetcsv($fp, 100, ";")) !== false) {

                    //$row = fgetcsv($fp, 100, ";");
                    if ($row != false) {
                        try {
                            $id = $row[0];
                            $nombre = $row[1];
                            $direccion = $row[2];

                            $this->db->select_db("Ejercicio7");
                            $query = $this->db->prepare("INSERT INTO Compania 
                                (id, nombre, direccion)
                                 values (?, ?, ?)");
                            $query->bind_param(
                                "sss",
                                $id,
                                $nombre,
                                $direccion
                            );
                            $query->execute();
                        } catch (Exception $e) {
                            echo "<p>Error al insertar en fila " . $counter . "</p>";
                        }
                        $counter++;
                    }

                   
                }
                if ($counter >= 0) {
                    echo "<p>" . $counter . " comanias insertadas</p>";
                } else {
                    echo "<p>No se pudo insertar nada</p>";
                }
            }
            public function addPelicula()
            {


                $id = $_POST["idPeli"];
                $titulo = $_POST["tituloPeli"];
                $argumento = $_POST["argumentoPeli"];
                $categoria = $_POST["categoriaPeli"];
                $duracion = $_POST["duracionPeli"];
                $fecha = $_POST["fechaPeli"];

                $id_compania = $_POST["compaPeli"];

                $query =  $this->db->prepare("SELECT * FROM Compania WHERE id=?");
                $query->bind_param("s", $id_compania);
                $query->execute();

                $result = $query->get_result();
                $result->data_seek(0);

                if ($result->fetch_assoc() == NULL) {
                    echo "<p>Error, Comania no encontrada en la BD</p>";
                } else {


                    $this->db->select_db("Ejercicio7");
                    $query = $this->db->prepare("INSERT INTO pelicula 
                (id, titulo, argumento, categoria, duracion, fecha, id_compania)
                values (?, ?, ?,?,?,?,?)");
                    $query->bind_param(
                        "ssssdss",
                        $id,
                        $titulo,
                        $argumento,
                        $categoria,
                        $duracion,
                        $fecha,
                        $id_compania
                    );
                    $query->execute();
                    if (strlen($query->error) === 0) {
                        echo "<p>Usuario Insertado</p>";
                    } else {
                        echo "<p>" . $query->error . "</p>";
                    }
                }
                $query->close();
            }

            public function cargarFormPelicula()
            {
                echo "
                <h3>Cargar Peliculas</h3>
                <form action='#' method='post' enctype='multipart/form-data'>
                    <p>
                        <label for='archPeli'> Archivo a cargar desde la máquina cliente</label>
                        <input id = 'archPeli'type='file' name='archivo'/>
                    </p>
                    <p>
                        <input type='submit' name = 'cargarPeliAccion' value='Cargar'/>
                    </p>
                </form>

                ";
            }
            public function cargarPeliculas()
            {

              
                $fp = fopen($_FILES['archivo']['tmp_name'], 'rb');
                $counter = 0;
                while (($row = fgetcsv($fp, 100, ";")) !== false) {
                    if ($row != false) {
                        try {
                            $id = $row[0];
                            $titulo = $row[1];
                            $argumento = $row[2];
                            $categoria = $row[3];
                            $duracion = $row[4];
                            $fecha = $row[5];
                            $id_compania = $row[6];
                            $query =  $this->db->prepare("SELECT * FROM Compania WHERE id=?");
                            $query->bind_param("s", $id_compania);
                            $query->execute();

                            $result = $query->get_result();
                            $result->data_seek(0);

                            if ($result->fetch_assoc() == NULL) {
                                echo "<p>Error, Compania no encontrada en la BD</p>";
                            } else {


                                $this->db->select_db("Ejercicio7");
                                $query = $this->db->prepare("INSERT INTO pelicula 
                                (id, titulo, argumento, categoria, duracion, fecha, id_compania)
                                values (?, ?, ?,?,?,?,?)");
                                $query->bind_param(
                                    "ssssdss",
                                    $id,
                                    $titulo,
                                    $argumento,
                                    $categoria,
                                    $duracion,
                                    $fecha,
                                    $id_compania
                                );
                                $query->execute();
                            }
                        } catch (Exception $e) {
                            echo "<p>Error al insertar en fila " . $counter . "</p>";
                        }
                        $counter++;
                    }

                    
                }
                if ($counter >= 0) {
                    echo "<p>" . $counter . " peliculas insertadas</p>";
                } else {
                    echo "<p>No se pudo insertar nada</p>";
                }
            }

            public function addDirector()
            {


                $id = $_POST["idDir"];
                $nombre = $_POST["nombreDir"];
                $fecha = $_POST["fechaDir"];

                $id_pelicula = $_POST["idPelDir"];



                $query =  $this->db->prepare("SELECT * FROM Pelicula WHERE id=?");
                $query->bind_param("s", $id_pelicula);
                $query->execute();

                $result = $query->get_result();
                $result->data_seek(0);

                if ($result->fetch_assoc() == NULL) {
                    echo "<p>Error, Pelicula no asociada en la BD</p>";
                } else {

                    $query = $this->db->prepare("INSERT INTO Director 
                (id, nombre, fechaNacimiento)
                values (?, ?, ?)");
                    $query->bind_param(
                        "sss",
                        $id,
                        $nombre,
                        $fecha
                    );
                    $query->execute();
                    if (strlen($query->error) === 0) {
                        echo "<p>Director Insertado</p>";
                    } else {
                        echo "<p>" . $query->error . "</p>";
                    }


                    $query = $this->db->prepare("INSERT INTO Direccion 
                (id_pelicula, id_director)
                values (?, ?)");
                    $query->bind_param(
                        "ss",
                        $id_pelicula,
                        $id

                    );
                    $query->execute();
                    if (strlen($query->error) === 0) {
                        echo "<p>Pelicula y Director enlazados</p>";
                    } else {
                        echo "<p>" . $query->error . "</p>";
                    }
                }
                $query->close();
            }
            public function cargarFormDirector()
            {
                echo "
                <h3>Cargar Directores</h3>
                <form action='#' method='post' enctype='multipart/form-data'>
                    <p>
                        <label for='archDir'> Archivo a cargar desde la máquina cliente</label>
                        <input id = 'archDir'type='file' name='archivo'/>
                    </p>
                    <p>
                        <input type='submit' name = 'cargarDirectorAccion' value='Cargar'/>
                    </p>
                </form>

                ";
            }
            public function cargarDirector()
            {

                
                $fp = fopen($_FILES['archivo']['tmp_name'], 'rb');
                $counter = 0;
                while (($row = fgetcsv($fp, 100, ";")) !== false) {
                    if ($row != false) {
                        try {
                            $id = $row[0];
                            $nombre = $row[1];
                            $fecha = $row[2];
                            $id_pelicula = $row[3];

                            $query =  $this->db->prepare("SELECT * FROM Pelicula WHERE id=?");
                            $query->bind_param("s", $id_pelicula);
                            $query->execute();

                            $result = $query->get_result();
                            $result->data_seek(0);

                            if ($result->fetch_assoc() == NULL) {
                                echo "<p>Error, Pelicula " . $id_pelicula . " no asociada en la BD</p>";
                            } else {

                                $query = $this->db->prepare("INSERT INTO Director 
                            (id, nombre, fechaNacimiento)
                            values (?, ?, ?)");
                                $query->bind_param(
                                    "sss",
                                    $id,
                                    $nombre,
                                    $fecha
                                );
                                $query->execute();
                                $query = $this->db->prepare("INSERT INTO Direccion 
                            (id_pelicula, id_director)
                            values (?, ?)");
                                $query->bind_param(
                                    "ss",
                                    $id_pelicula,
                                    $id

                                );
                                $query->execute();
                            }
                        } catch (Exception $e) {
                            echo "<p>Error al insertar en fila " . $counter . "</p>";
                        }
                        $counter++;
                    }

                    
                }
                if ($counter >= 0) {
                    echo "<p>" . $counter . " directores insertados</p>";
                } else {
                    echo "<p>No se pudo insertar nada</p>";
                }
            }
            
            public function verPeliculas()
            {
                $this->db->select_db("Ejercicio7");

                if ($query = $this->db->query("SELECT * FROM Pelicula")) {
                    while ($row = $query->fetch_row()) {
                        echo '
                        <ul>
                            <li>ID: ' . $row[0] . '</li>
                            <li>Titulo: ' . $row[1] . '</li>
                            <li>Argumento: ' . $row[2] . '</li>
                            <li>Categoria: ' . $row[3] . '</li>
                            <li>Duracion: ' . $row[4] . '</li>
                            <li>Fecha: ' . $row[5] . '</li>
                            <li>ID Compania: ' . $row[6] . '</li>

                        </ul>
        
                        ';
                    }
                    $query->close();
                }else{
                    echo "<p>Error al consultar</p>";
                }
            }


            public function responderPeticion()
            {
                if (isset($_POST["addFilm"])) $this->insertarFormularioPeli();
                if (isset($_POST["addCompany"])) $this->insertarFormularioComp();
                if (isset($_POST["addDirector"])) $this->insertarFormularioDirector();

                if (isset($_POST["insertarCompAccion"])) $this->addCompania();
                if (isset($_POST["fileCompAccion"])) $this->cargarFormCompania();
                if (isset($_POST["cargarCompAccion"])) $this->cargarCompania();

                if (isset($_POST["insertarPeliAccion"])) $this->addPelicula();
                if (isset($_POST["filePeliAccion"])) $this->cargarFormPelicula();
                if (isset($_POST["cargarPeliAccion"])) $this->cargarPeliculas();

                if (isset($_POST["insertarDirecAccion"])) $this->addDirector();
                if (isset($_POST["fileDirectorAccion"])) $this->cargarFormDirector();
                if (isset($_POST["cargarDirectorAccion"])) $this->cargarDirector();

                if (isset($_POST["verPeliculas"])) $this->verPeliculas();
                //if (isset($_POST["tabla"])) $this->crearTabla();
            }
        }

        if (count($_POST) > 0) {
            $_SESSION["database"]->responderPeticion();
        }

        ?>
        <p>.</p>
    </main>
    <footer>
        Por Daniel Pascual Lopez - UO269728
        
    </footer>
</body>

</html>