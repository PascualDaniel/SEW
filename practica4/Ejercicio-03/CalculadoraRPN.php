<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <meta name="author" content="Daniel Pascual">
    <meta name="description" content="Una pagina web de una calculadora">
    <meta name="keywords" content="Calculadora, JavaScript">
    <title>Calculadora RPN</title>
    <link rel="stylesheet" type="text/css" href="CalculadoraRPN.css" />
</head>

<body>
    <header>
        <h1>Calculadora RPN</h1>
    </header>
    <?php

    session_name("calculadora");

    session_start();
   
    if (!isset($_SESSION["calculadora"])) {
        $_SESSION["calculadora"] = new Calculadora();
    }

    class Calculadora
    {
        private $pantalla;
        private $memoria;
        private $escribiendo;
        private $pila;

        private $html;

        public function __construct()
        {
            $this->pila = array(0);
            $this->escribiendo = true;
            $this->pantalla = "0";
            $this->memoria = 0;
            $this->resultado = 0;
            $this->refrescarPila();
        }

        public function mmas()
        {
            $this->memoria +=   floatval($this->pantalla);
        }
        public function mmenos()
        {
            $this->memoria -=   floatval($this->pantalla);
        }
        public function  mlimpiar()
        {
            $this->memoria =  0;
        }

        public  function msacar()
        {

            $this->pantalla =  $this->memoria;
            $this->escribiendo = true;
        }

        public function getPantalla()
        {
            return $this->pantalla;
        }

        public function getPilaHtml()
        {
            return $this->html;
        }
        public function addElement($caracter)
        {
            if ($this->escribiendo) {
                $this->pantalla = $caracter;
                $this->escribiendo = false;
            } else {
                $this->pantalla .= $caracter;
            }
        }

        public function enter()
        {
            array_unshift($this->pila, floatval($this->pantalla));

            $this->refrescarPila();
            $this->escribiendo = true;
            $this->pantalla = "0";
        }
        public function refrescarPila()
        {
            $elementosHtml = "";
            for ($i = count($this->pila) - 1; $i >= 0; $i--) {
                $elementosHtml .= "<li>" . $this->pila[$i] . "</li>";
            }

            $this->html = $elementosHtml;
        }
        public function suma()
        {
            if ($this->pila != null && count($this->pila) > 1) {
                $num = array_shift($this->pila);
                $num2 = array_shift($this->pila);
                array_unshift($this->pila, $num + $num2);
                $this->refrescarPila();
            }
        }
        public function resta()
        {
            if ($this->pila != null && count($this->pila) > 1) {
                $num = array_shift($this->pila);
                $num2 = array_shift($this->pila);
                array_unshift($this->pila, $num - $num2);

                $this->refrescarPila();
            }
        }
        public function multi()
        {
            if ($this->pila != null && count($this->pila) > 1) {
                $num = array_shift($this->pila);
                $num2 = array_shift($this->pila);
                array_unshift($this->pila, $num * $num2);

                $this->refrescarPila();
            }
        }
        public function div()
        {
            if ($this->pila != null && count($this->pila) > 1) {
                $num = array_shift($this->pila);
                $num2 = array_shift($this->pila);
                array_unshift($this->pila, $num / $num2);

                $this->refrescarPila();
            }
        }

        public function pow()
        {

            if ($this->pila != null && count($this->pila) > 0) {
                $num = array_shift($this->pila);
                $num2 = array_shift($this->pila);
                array_unshift($this->pila, pow(floatval($num), floatval($num2)));
                $this->refrescarPila();
            }
        }

        public function limpiar()
        {
            $this->ce();
            $this->pila = array(0);
            $this->refrescarPila();
        }
        public function ce()
        {
            $this->escribiendo = true;
            $this->pantalla = "0";
        }

        public function pi()
        {
            $this->escribiendo = true;
            $this->pantalla = pi();
        }
        public function e()
        {
            $this->escribiendo = true;
            $this->pantalla = exp(1);
        }

        public function abs()
        {
            if ($this->pila != null && count($this->pila) > 0) {
                $num = array_shift($this->pila);
                array_unshift($this->pila, abs(floatval($num)));
                $this->refrescarPila();
            }
        }
        public function cos()
        {
            if ($this->pila != null && count($this->pila) > 0) {
                $num = array_shift($this->pila);
                array_unshift($this->pila, cos(floatval($num)));
                $this->refrescarPila();
            }
        }
        public function cosh()
        {
            if ($this->pila != null && count($this->pila) > 0) {
                $num = array_shift($this->pila);
                array_unshift($this->pila, cosh(floatval($num)));
                $this->refrescarPila();
            }
        }
        public function sen()
        {
            if ($this->pila != null && count($this->pila) > 0) {
                $num = array_shift($this->pila);
                array_unshift($this->pila, sin(floatval($num)));
                $this->refrescarPila();
            }
        }
        public function senh()
        {
            if ($this->pila != null && count($this->pila) > 0) {
                $num = array_shift($this->pila);
                array_unshift($this->pila, sinh(floatval($num)));
                $this->refrescarPila();
            }
        }
        public function tan()
        {
            if ($this->pila != null && count($this->pila) > 0) {
                $num = array_shift($this->pila);
                array_unshift($this->pila, tan(floatval($num)));
                $this->refrescarPila();
            }
        }
        public function tanh()
        {
            if ($this->pila != null && count($this->pila) > 0) {
                $num = array_shift($this->pila);
                array_unshift($this->pila, tanh(floatval($num)));
                $this->refrescarPila();
            }
        }
        public function exp()
        {
            if ($this->pila != null && count($this->pila) > 0) {
                $num = array_shift($this->pila);
                array_unshift($this->pila, exp(floatval($num)));
                $this->refrescarPila();
            }
        }

        public function sqrt()
        {
            if ($this->pila != null && count($this->pila) > 0) {
                $num = array_shift($this->pila);
                array_unshift($this->pila, sqrt(floatval($num)));
                $this->refrescarPila();
            }
        }
        public function log()
        {
            if ($this->pila != null && count($this->pila) > 0) {
                $num = array_shift($this->pila);
                array_unshift($this->pila, log10(floatval($num)));
                $this->refrescarPila();
            }
        }
        public function ln()
        {
            if ($this->pila != null && count($this->pila) > 0) {
                $num = array_shift($this->pila);
                array_unshift($this->pila, log(floatval($num)));
                $this->refrescarPila();
            }
        }
        public function inversa()
        {
            try {
                $valor = 1 / floatval($this->pantalla);
                $this->pantalla =  $valor;
            } catch (Error $e) {
                $this->pantalla = "INF";
                $this->escribiendo = true;
            }
        }

        public function responderPeticion()
        {
            if (isset($_POST["MC"])) $this->mlimpiar();
            if (isset($_POST["MR"])) $this->msacar();
            if (isset($_POST["M+"])) $this->mmas();
            if (isset($_POST["M-"])) $this->mmenos();
            if (isset($_POST["sin"])) $this->sen();
            if (isset($_POST["cos"])) $this->cos();
            if (isset($_POST["tan"])) $this->tan();
            if (isset($_POST["C"])) $this->limpiar();
            if (isset($_POST["sinh"])) $this->senh();
            if (isset($_POST["cosh"])) $this->cosh();
            if (isset($_POST["tanh"])) $this->tanh();
            if (isset($_POST["ce"])) $this->ce();
            if (isset($_POST["ln"])) $this->ln();
            if (isset($_POST["log"])) $this->log();
            if (isset($_POST["x^y"])) $this->pow();
            if (isset($_POST["sqrt"])) $this->sqrt();
            if (isset($_POST["e"])) $this->e();
            if (isset($_POST["pi"])) $this->pi();
            if (isset($_POST["1/x"])) $this->inversa();
            if (isset($_POST["abs"])) $this->abs();

            if (isset($_POST["7"])) $this->addElement(7);
            if (isset($_POST["8"])) $this->addElement(8);
            if (isset($_POST["9"])) $this->addElement(9);
            if (isset($_POST["*"])) $this->multi();

            if (isset($_POST["4"])) $this->addElement(4);
            if (isset($_POST["5"])) $this->addElement(5);
            if (isset($_POST["6"])) $this->addElement(6);
            if (isset($_POST["-"])) $this->resta();

            if (isset($_POST["1"])) $this->addElement(1);
            if (isset($_POST["2"])) $this->addElement(2);
            if (isset($_POST["3"])) $this->addElement(3);
            if (isset($_POST["+"])) $this->suma();

            if (isset($_POST["0"])) $this->addElement(0);
            if (isset($_POST["."])) $this->addElement('.');
            if (isset($_POST["/"])) $this->div();
            if (isset($_POST["enter"])) $this->enter();
        }
    }

    if (count($_POST) > 0) {
        $_SESSION["calculadora"]->responderPeticion();
    }

    echo '
    <main >

            <ul > 
            ' . $_SESSION["calculadora"]->getPilaHtml() . '
            
            </ul>
            <label for = "pantalla" hidden> Pantalla de la calculadora </label>
            <input id="pantalla"  value="' . $_SESSION["calculadora"]->getPantalla() . '" type="text" readonly  >
           
            <form action="#" method="post" name="botones">
                <input type="submit"  value="MC"  name="MC">
                <input type="submit"  value="MR"  name="MR">
                <input type="submit"  value="M+"  name="M+">
                <input type="submit"  value="M-"  name="M-">
                <input type="submit"  value="Sin"  name="sin">
                <input type="submit"  value="Cos" name="cos">
                <input type="submit"  value="Tan"  name="tan">
                <input type="submit"  value="C"  name="C">

                <input type="submit"  value="Sec"  name="sinh">
                <input type="submit"  value="Csc"  name="cosh">
                <input type="submit"  value="Cot"  name="tanh">
                <input type="submit"  value="CE" name="ce">

                <input type="submit"  value="ln"  name="ln">
                <input type="submit"  value="log"  name="log">
                <input type="submit"  value="x^y" name="x^y">
                <input type="submit"  value="sqrt"  name="sqrt">

                <input type="submit"  value="e"  name="e">
                <input type="submit"  value="pi"  name="pi">
                <input type="submit"  value="1/x"  name="1/x">
                <input type="submit"  value="|x|"  name="abs">

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
                <input type="submit"  value="/" name="/">
                <input type="submit"  value="enter" name="enter">
            </form>
          
        </main>

    ' ?>
    <footer>
        Hecho por Daniel Pascual Lopez - UO269728
    </footer>
</body>

</html>