"use strict";
class Calculadora {
    constructor() {
        this.vPantalla = "0";//valor de la pantalla actual
        this.memoria = "0";
    }
    addElement(x) {
        if (this.vPantalla == "0") {
            this.vPantalla = x;
        } else {
            this.vPantalla += x;
        }
        document.getElementById('pantalla').value = this.vPantalla;
    }
    calc() {
        try {
            this.vPantalla = eval(this.vPantalla);
            document.getElementById('pantalla').value = this.vPantalla;
        } catch (err) {
            this.vPantalla = "Error: " + err;
            document.getElementById('pantalla').value = this.vPantalla;
        }
    }
    limpiar() {
        try {
            this.vPantalla = "0";
            document.getElementById('pantalla').value = this.vPantalla;
        } catch (err) {
            this.vPantalla = "Error: " + err;
            document.getElementById('pantalla').value = this.vPantalla;
        }
    }
    //M+
    sumarMemoria() {
        try {
            this.memoria = eval(this.memoria + " + " + this.vPantalla);

        } catch (err) {
            this.vPantalla = "Error: " + err;
            document.getElementById('pantalla').value = this.vPantalla;
        }
    }
    multMemoria() {
        try {
            this.memoria = eval(this.memoria + " * " + this.vPantalla);

        } catch (err) {
            this.vPantalla = "Error: " + err;
            document.getElementById('pantalla').value = this.vPantalla;
        }
    }
    //M-
    restarMemoria() {
        try {
            this.memoria = eval(this.memoria + " - " + this.vPantalla);

        } catch (err) {
            this.vPantalla = "Error: " + err;
            document.getElementById('pantalla').value = this.vPantalla;
        }
    }
    //MRC
    sacarMemoria() {

        this.vPantalla = "" + this.memoria;
        document.getElementById('pantalla').value = this.vPantalla;

    }
    limpiarMemoria() {

        this.memoria = 0;

    }
}


class CalculadoraCientifica extends Calculadora {
    constructor() {
        super();
    }
    ce() {
        try {
            if (this.vPantalla.length == 1) {
                this.vPantalla = "0";
                document.getElementById('pantalla').value = this.vPantalla;
            }
            else {
                this.vPantalla = this.vPantalla.slice(0, -1)
                document.getElementById('pantalla').value = this.vPantalla;
            }
        } catch (err) {
            this.vPantalla = "Error: No es un numero valido";
            document.getElementById('pantalla').value = this.vPantalla;
        }
    }

    pi() {
        if (this.vPantalla == "0") {
            this.vPantalla = "" + Math.PI;
        } else {
            this.vPantalla += "" + Math.PI;
        }
        document.getElementById('pantalla').value = this.vPantalla;

    }
    e() {
        if (this.vPantalla == "0") {
            this.vPantalla = "" + Math.E;
        } else {
            this.vPantalla += "" + Math.E;
        }
        document.getElementById('pantalla').value = this.vPantalla;

    }
    fact() {
        if (this.vPantalla.toString().split(".").length == 1 && eval(this.vPantalla) >= 0) {
            this.vPantalla = this.factorial(eval(this.vPantalla));
            document.getElementById('pantalla').value = this.vPantalla;
        } else {
            document.getElementById('pantalla').value = "Error: Numero Incorrecto";
        }

    }
    factorial(i) {
        if (i == 0) {
            return 1;
        } else {
            return i * this.factorial(i - 1);
        }
    }
    abs() {
        this.vPantalla = Math.abs(eval(this.vPantalla));
        document.getElementById('pantalla').value = this.vPantalla;
    }
    cos() {
        this.vPantalla = Math.cos(eval(this.vPantalla));
        document.getElementById('pantalla').value = this.vPantalla;
    }
    cosh() {
        this.vPantalla = Math.cosh(eval(this.vPantalla));
        document.getElementById('pantalla').value = this.vPantalla;
    }
    sen() {
        this.vPantalla = Math.sin(eval(this.vPantalla));
        document.getElementById('pantalla').value = this.vPantalla;
    }
    senh() {
        this.vPantalla = Math.sinh(eval(this.vPantalla));
        document.getElementById('pantalla').value = this.vPantalla;
    }
    tan() {
        this.vPantalla = Math.tan(eval(this.vPantalla));
        document.getElementById('pantalla').value = this.vPantalla;
    }
    tanh() {
        this.vPantalla = Math.tanh(eval(this.vPantalla));
        document.getElementById('pantalla').value = this.vPantalla;
    }
    exp() {
        this.vPantalla = Math.exp(eval(this.vPantalla));
        document.getElementById('pantalla').value = this.vPantalla;
    }
    sqrt() {
        this.vPantalla = Math.sqrt(eval(this.vPantalla));
        document.getElementById('pantalla').value = this.vPantalla;
    }
    sqrt3() {
        this.vPantalla = Math.pow(eval(this.vPantalla), 1 / 3);
        document.getElementById('pantalla').value = this.vPantalla;
    }
    log() {
        this.vPantalla = Math.log10(eval(this.vPantalla));
        document.getElementById('pantalla').value = this.vPantalla;
    }
    log2() {
        this.vPantalla = Math.log2(eval(this.vPantalla));
        document.getElementById('pantalla').value = this.vPantalla;
    }
    ln() {
        this.vPantalla = Math.log(eval(this.vPantalla));
        document.getElementById('pantalla').value = this.vPantalla;
    }
    exponentex() {
        this.vPantalla += "**";
        document.getElementById('pantalla').value = this.vPantalla;
    }
    exponente2() {
        this.vPantalla += "**2";
        document.getElementById('pantalla').value = this.vPantalla;
    }
    exponente3() {
        this.vPantalla += "**3";
        document.getElementById('pantalla').value = this.vPantalla;
    }
    exponente4() {
        this.vPantalla += "**4";
        document.getElementById('pantalla').value = this.vPantalla;
    }
    elevare() {
        this.vPantalla = Math.pow(Math.E, eval(this.vPantalla));
        document.getElementById('pantalla').value = this.vPantalla;
    }
    elevar2() {
        this.vPantalla = Math.pow(2, eval(this.vPantalla));
        document.getElementById('pantalla').value = this.vPantalla;
    }
    elevar10() {
        this.vPantalla = Math.pow(10, eval(this.vPantalla));
        document.getElementById('pantalla').value = this.vPantalla;
    }
    inversa() {
        this.vPantalla = "1/" + this.vPantalla;
        document.getElementById('pantalla').value = this.vPantalla;
    }
    negativo() {
        this.vPantalla = "-" + this.vPantalla;
        document.getElementById('pantalla').value = this.vPantalla;
    }
}
var calculadora = new CalculadoraCientifica();
