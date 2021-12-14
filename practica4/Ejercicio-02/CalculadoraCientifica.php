<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <meta name="author" content="Daniel Pascual">
    <meta name="description" content="Una pagina web de una calculadora">
    <meta name="keywords" content="Calculadora, JavaScript">
    <title>Calculadora Cientifica</title>
    <link rel="stylesheet" type="text/css" href="CalculadoraCientifica.css" />
</head>

<body>
    <header>
        <h1>Calculadora Cientifica</h1>
    </header> 
    <?php

    session_name("calculadora");

    session_start();

    if (!isset($_SESSION["calculadora"])) {
        $_SESSION["calculadora"] = new CalculadoraCientifica();
    }

    class CalculadoraBasica
    {
        protected  $pantalla;
        protected  $memoria;
        protected  $resultado;
     

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

    class CalculadoraCientifica extends CalculadoraBasica {


        public function __construct()
        {
            parent::__construct();
        }

        public function getPantalla() {
            return $this->pantalla;
        }
        public function responderPeticion() 
        {
            parent::responderPeticion();
            if (isset($_POST["("])) $this->addElement("(");
            if (isset($_POST[")"])) $this->addElement(")");

            if (isset($_POST["mrc"])) $this->limpiarMemoria();
            if (isset($_POST["m*"])) $this->multMemoria();
            if (isset($_POST["ce"])) $this->ce();
            if (isset($_POST["e"])) $this->e();
          
            if (isset($_POST["abs"])) $this->abs();

            if (isset($_POST["sinh"])) $this->senh();
            if (isset($_POST["cosh"])) $this->cosh();
            if (isset($_POST["tanh"])) $this->tanh();
            if (isset($_POST["fact"])) $this->fact();
            if (isset($_POST["pi"])) $this->pi();
            if (isset($_POST["sin"])) $this->sen();
            if (isset($_POST["cos"])) $this->cos();
            if (isset($_POST["tan"])) $this->tan();
            if (isset($_POST["exp"])) $this->exp();
            if (isset($_POST["sqrt"])) $this->sqrt();
            if (isset($_POST["sqrt3"])) $this->sqrt3();
            if (isset($_POST["log"])) $this->log();
            if (isset($_POST["log2"])) $this->log2();
            if (isset($_POST["ln"])) $this->ln();
            
            //exponentex
            if (isset($_POST["^"])) $this->exponentex();
            if (isset($_POST["^2"])) $this->exponente2();
            if (isset($_POST["^3"])) $this->exponente3();
            if (isset($_POST["^4"])) $this->exponente4();
           //elevar
            if (isset($_POST["e^"])) $this->elevare();
            if (isset($_POST["2^"])) $this->elevar2();
            if (isset($_POST["10^"])) $this->elevar10();


            if (isset($_POST["inv"])) $this->inversa();
            if (isset($_POST["neg"])) $this->negativo();
          


           
        }

        
        public function limpiarMemoria() {
            $this->memoria = 0;
        }
        public function multMemoria() {
            $this->memoria = $this->memoria* eval("return $this->pantalla;");
        }
        public function ce() {
          
            $this->pantalla =  substr( $this->pantalla, 0, -1);
        }
    
        public function pi() {
            if ( $this->pantalla =="Error" || $this->pantalla == "0") 
            $this->pantalla = pi();

            $this->pantalla .=  pi();
    
        }
        public function e() {
            if ( $this->pantalla =="Error" || $this->pantalla == "0") 
            $this->pantalla = exp(1);

            $this->pantalla .=  exp(1);
    
        }
        public function fact() {
            $this->resultado = $this->factorial(eval("return $this->pantalla;"));
            $this->pantalla = $this->resultado;
    
        }
        public function factorial($i) {
            if ($i == 0) {
                return 1;
            } else {
                return $i * $this->factorial($i - 1);
            }
        }
        public function abs() {
            $this->pantalla = abs($this->pantalla);
        }
        public function cos() {
            $this->resultado = cos(eval("return $this->pantalla;"));
            $this->pantalla = $this->resultado;
        }
        public function cosh() {
            $this->resultado = cosh(eval("return $this->pantalla;"));
            $this->pantalla = $this->resultado;
        }
      
        public function  sen() {
            $this->resultado = sin(eval("return $this->pantalla;"));
            $this->pantalla = $this->resultado;
        }
        public function senh() {
            $this->resultado = sinh(eval("return $this->pantalla;"));
            $this->pantalla = $this->resultado;
        }
        public function tan() {
            $this->resultado = tan(eval("return $this->pantalla;"));
            $this->pantalla = $this->resultado;
        }
        public function tanh() {
            $this->resultado = tanh(eval("return $this->pantalla;"));
            $this->pantalla = $this->resultado;
        }
        public function exp() {
            $this->resultado = exp(eval("return $this->pantalla;"));
            $this->pantalla = $this->resultado;
        }
        public function sqrt() {
            $this->resultado = sqrt(eval("return $this->pantalla;"));
            $this->pantalla = $this->resultado;
        }
        public function sqrt3() {
            $this->resultado = pow(eval("return $this->pantalla;"),1/3);
            $this->pantalla = $this->resultado;
        }
        public function log() {
            $this->resultado = log10(eval("return $this->pantalla;"));
            $this->pantalla = $this->resultado;
        }
        public function log2() {
            $this->resultado = log1p(eval("return $this->pantalla;"));
            $this->pantalla = $this->resultado;
        }
        public function ln() {
            $this->resultado = log(eval("return $this->pantalla;"));
            $this->pantalla = $this->resultado;
        }
        public function exponentex() {
            $this->pantalla .=  "**";
        }
        public function exponente2() {
            $this->pantalla .=  "**2";
        }
        public function exponente3() {
            $this->pantalla .=  "**3";
        }
        public function exponente4() {
            $this->pantalla .=  "**4";
        }
        public function elevare() {
            $this->resultado = pow(exp(1),eval("return $this->pantalla;"));
            $this->pantalla = $this->resultado;
        }
        public function elevar2() {
            $this->resultado = pow(2,eval("return $this->pantalla;"));
            $this->pantalla = $this->resultado;
        }
        public function elevar10() {
            $this->resultado = pow(10,eval("return $this->pantalla;"));
            $this->pantalla = $this->resultado;
        }
        public function inversa() {
            $this->pantalla ="1/" +$this->pantalla;
        }
        public function negativo() {
            $this->pantalla ="-" +$this->pantalla;
        }

    }

    if (count($_POST) > 0) {
        $_SESSION["calculadora"] -> responderPeticion();
    }

    echo '
    <main  name="calculadora">
            <label for = "pantalla" hidden> Pantalla de la calculadora </label>
            <input id="pantalla"  value="' . $_SESSION["calculadora"] -> getPantalla() . '" type="text" readonly  >
           
            <form action="#" method="post" name="botones">
                    <input type="submit" value="MC" name="mc">
                    <input type="submit" name="sacarMemoria" value="mrc" >
                    <input type="submit" name="restarMemoria" value="m-" >
                    <input type="submit" name="sumarMemoria" value="m+" >
                    <input type="submit" value="M*" name="m*"">


                    <input type="submit" value="Sin" name="sin"">
                    <input type="submit" value="Cos" name="cos"">
                    <input type="submit" value="Tan" name="tan"">
                    <input type="submit" value="X^3" name="^3"">
                    <input type="submit" value="C" name="limpiar"">

                    <input type="submit" value="Sec"name="sinh">
                    <input type="submit" value="Csc" name="cosh">
                    <input type="submit" value="Cot" name="tanh"">
                    <input type="submit" value="x^2"name="^2">
                    <input type="submit" value="CE" name="ce">

                    <input type="submit" value="ln" name="ln">
                    <input type="submit" value="log" name="log">
                    <input type="submit" value="10^x" name="10^">
                    <input type="submit" value="x^y" name="^">
                    <input type="submit" value="raiz" name="sqrt">

                    <input type="submit" value="e^x" name="e^">
                    <input type="submit" value="log2y" name="log2">
                    <input type="submit" value="2^x" name="2^">
                    <input type="submit" value="x^4" name="^4">
                    <input type="submit" value="raiz3" name="sqrt3">

                    <input type="submit" value="1/x" name="inv">
                    <input type="submit" value="|x|" name="abs">
                    <input type="submit" value="exp" name="exp">
                    <input type="submit" value="+/-" name="neg">
                    <input type="submit" name="/" value="/" > 

                    <input type="submit" value="n!" name="fact">         
                    <input type="submit" name="7" value="7" >
                    <input type="submit" name="8" value="8" >
                    <input type="submit" name="9" value="9" >
                    <input type="submit" value="*" name="*">
               
                    <input type="submit" value="pi" name="pi">
                    <input type="submit" value="4" name="4">
                    <input type="submit" value="5" name="5">
                    <input type="submit" value="6" name="6">
                    <input type="submit" value="-" name="-">

                    <input type="submit" value="e" name="e">
                    <input type="submit" value="1" name="1">
                    <input type="submit" value="2" name="2">
                    <input type="submit" value="3" name="3">
                    <input type="submit" value="+" name="+">
                
                    <input type="submit" value="(" name="(">
                    <input type="submit" value=")" name=")">
                    <input type="submit" value="0" name="0">
                    <input type="submit" value="." name=".">
                    <input type="submit" value="=" name="calc">
            </form>
          
        </main>

    '?>
</body>

</html>