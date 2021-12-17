<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <meta name="author" content="Daniel Pascual">
    <meta name="description" content="Una pagina web de una calculadora">
    <meta name="keywords" content="Calculadora, JavaScript">
    <title>Calculadora Basica</title>
    <link rel="stylesheet" type="text/css" href="CalculadoraBasica.css" />
</head>

<body>
    <header>
        <h1>Calculadora básica</h1>
    </header> 
    <?php

    session_name("CalculadoraBasica");

    session_start();

    if (!isset($_SESSION["calculadora"])) {
        $_SESSION["calculadora"] = new CalculadoraBasica();
    }

    class CalculadoraBasica
    {
        private $pantalla;
        private $memoria;
        private $resultado;
     

        public function __construct()
        {
            $this->pantalla = "";
            $this->memoria = 0;
            $this->resultado = 0;
          
        }

        public function getPantalla() {
            return $this -> pantalla;
        }

        public function addElement($caracter)
        {
             if ( $this->pantalla =="Error" || $this->pantalla == "0") 
                $this->pantalla = $caracter;

            $this->pantalla .= $caracter;
        }

        public function limpiar()
        {
            $this->pantalla = "";
            $this->resultado = 0;
        
        }


        public function calc() {
            try {
                $this -> resultado = eval("return $this->pantalla;");
                $this -> pantalla = $this -> resultado;
            } catch (ParseError $pe) {
                $this -> pantalla = "Error";
            }
        }

        

        public function sacarMemoria()
        {
            $this->pantalla = $this->memoria;
        }

        public function sumarMemoria()
        {
            $this->memoria += eval("return $this->pantalla;");
        }

        public function restarMemoria()
        {
            $this->memoria -= eval("return $this->pantalla;");
        }

       

        public function responderPeticion() {
            if (isset($_POST["sacarMemoria"])) $this -> sacarMemoria();
            if (isset($_POST["restarMemoria"])) $this -> restarMemoria();
            if (isset($_POST["sumarMemoria"])) $this -> sumarMemoria();
            if (isset($_POST["/"])) $this -> addElement('/');

            if (isset($_POST["7"])) $this -> addElement(7);
            if (isset($_POST["8"])) $this -> addElement(8);
            if (isset($_POST["9"])) $this -> addElement(9);
            if (isset($_POST["*"])) $this -> addElement('*');

            if (isset($_POST["4"])) $this -> addElement(4);
            if (isset($_POST["5"])) $this -> addElement(5);
            if (isset($_POST["6"])) $this -> addElement(6);
            if (isset($_POST["-"])) $this -> addElement('-');

            if (isset($_POST["1"])) $this -> addElement(1);
            if (isset($_POST["2"])) $this -> addElement(2);
            if (isset($_POST["3"])) $this -> addElement(3);
            if (isset($_POST["+"])) $this -> addElement('+');

            if (isset($_POST["0"])) $this -> addElement(0);
            if (isset($_POST["."])) $this -> addElement('.');
            if (isset($_POST["borrar"])) $this -> limpiar();
            if (isset($_POST["calc"])) $this -> calc();
        }
    }

    if (count($_POST) > 0) {
        $_SESSION["calculadora"] -> responderPeticion();
    }

    echo '
    <main>
            <label for = "pantalla" hidden> Pantalla de la calculadora </label>
            <input id="pantalla"  value="' . $_SESSION["calculadora"] -> getPantalla() . '" type="text" readonly  >
           
            <form action="#" method="post" name="botones">
                    <input type="submit" name="sacarMemoria" value="mrc" >
                    <input type="submit" name="restarMemoria" value="m-" >
                    <input type="submit" name="sumarMemoria" value="m+" >
                    <input type="submit" name="/" value="/" >         

                    <input type="submit" name="7" value="7" >
                    <input type="submit" name="8" value="8" >
                    <input type="submit" name="9" value="9" >
                    <input type="submit" value="*" name="*">
               
                    <input type="submit" value="4" name="4">
                    <input type="submit" value="5" name="5">
                    <input type="submit" value="6" name="6">
                    <input type="submit" value="-" name="-">
                
                    <input type="submit" value="1" name="1">
                    <input type="submit" value="2" name="2">
                    <input type="submit" value="3" name="3">
                    <input type="submit" value="+" name="+">
                
                    <input type="submit" value="0" name="0">
                    <input type="submit" value="." name=".">
                    <input type="submit" value="C" name="borrar">
                    <input type="submit" value="=" name="calc">
            </form>
          
        </main>

    '?>
    <footer>
        Hecho por Daniel Pascual Lopez - UO269728
    </footer>
</body>

</html>