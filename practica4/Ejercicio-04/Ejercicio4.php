<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <meta name="author" content="Daniel Pascual">
    <meta name="description" content="Una pagina web que devuelve el precio del cobre">
    <meta name="keywords" content="Cobre, PHP">
    <title>Ejercicio 4</title>
    <link rel="stylesheet" type="text/css" href="Ejercicio4.css" />
</head>

<body>
    <header>
        <h1>Ejercicio 4</h1>
    </header>
    <?php
    // https://metals-api.com/api/latest ? access_key = YOUR_ACCESS_KEY
    // & base = EUR
    // & symbols = XCU
    //API = nrj501h6in76x32q6mxtpkd2v79k9unk6gq1m2lfq6k7xp2e7q1gqkd9g911
    session_name("cobre");

    session_start();

    if (!isset($_SESSION["cobre"])) {
        $_SESSION["cobre"] = new Copper();
    }

    class Copper
    {
        private $url = "https://metals-api.com/api/latest?access_key=nrj501h6in76x32q6mxtpkd2v79k9unk6gq1m2lfq6k7xp2e7q1gqkd9g911&base=EUR&symbols=XCU";
        private $precioCobre;

        public function cargarDatos()
        {
            $datos = file_get_contents($this->url);
            if ($datos == false) {
                echo "<p >Error</p>";
            } else {
                $datosJson = json_decode($datos);
                if ($datosJson == null) {
                    echo "<p >Error</p>";
                } else {
                    $cobre = $datosJson->rates->XCU;
                    $this->precioCobre = $cobre . "€";
                }
            }
        }


        public function getPrecio()
        {
            return $this->precioCobre;
        }

        public function responderPeticion()
        {
            if (isset($_POST["enter"])) $this->cargarDatos();
        }
    }

    if (count($_POST) > 0) {
        $_SESSION["cobre"]->responderPeticion();
    }

    echo '
    <main >
            <h2>Precio del cobre</h2>
            <label for = "pantalla" hidden> Pantalla del precio cobre </label>
            <input id="pantalla"  value="' . $_SESSION["cobre"]->getPrecio() . '" type="text" readonly  >
           
            <form action="#" method="post" name="botones">
                <input type="submit"  value="Obtener Precio" name="enter">
            </form>
          
        </main>

    ' ?>

    <footer>
        Hecho por Daniel Pascual Lopez - UO269728
    </footer>
</body>

</html>