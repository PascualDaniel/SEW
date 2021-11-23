"use strict";
class Calculadora {
    constructor() {
        this.vPantalla = "0";//valor de la pantalla actual
        this.memoria = "0";

        document.addEventListener("keypress", function (e) {
            calculadora.onKeyPress(e);
        });

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
            var texto = this.vPantalla;
            if(!isNaN(texto) && !isNaN(parseFloat(texto))) {

            }
            else {
                let tokens = this.tokenize(this.vPantalla);
                //print(tokens);
                this.vPantalla = eval(tokens.join(''));

                document.getElementById('pantalla').value = this.vPantalla;
            }
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
            this.calc();
            this.memoria = new Number(eval(this.memoria + "+" + this.vPantalla));

        } catch (err) {
            this.vPantalla = "Error: " + err;
            document.getElementById('pantalla').value = this.vPantalla;
        }
    }
    //M-
    restarMemoria() {
        try {
            this.calc();
            this.memoria = new Number(eval(this.memoria + "-" + this.vPantalla));

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

    tokenize(text) {
        // --- Parse a calculation string into an array of numbers and operators
        const tokens = [];
        let token = '';
        for (const character of text) {
            if ('^*/+-'.indexOf(character) > -1) {
                if (token === '' && character === '-') {
                    token = '-';
                } else {
                    if(!isNaN(token) && !isNaN(parseFloat(token)))
                        tokens.push(new Number(token), character);
                    else
                        tokens.push(token,character);
                    token = '';
                }
            } else {
                token += character;
            }
        }
        if (token !== '') {
            tokens.push(new Number(token));
        }
        console.log(tokens);
        return tokens;
    }


    tokenize(text) {
        // --- Parse a calculation string into an array of numbers and operators
        const tokens = [];
        let token = '';
        for (const character of text) {
            if ('^*/+-'.indexOf(character) > -1) {
                if (token === '' && character === '-') {
                    token = '-';
                } else {
                    tokens.push(new Number(token), character);
                    token = '';
                }
            } else {
                token += character;
            }
        }
        if (token !== '') {
            tokens.push(new Number(token));
        }
        console.log(tokens);
        return tokens;
    }
    //on keyboardEvent call function
    onKeyPress(keyboardEvent) {
        //console.log(keyboardEvent.key);
        switch (keyboardEvent.key) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '.':
                this.addElement(keyboardEvent.key);
                break;
            case '+':
            case '-':
            case '*':
            case '/':
                this.addElement(keyboardEvent.key);
                break;
            case 'Enter':
                this.calc();
                break;
            case 'backspace':
                this.limpiar();
                break;
            case 'b':
                this.sumarMemoria();
                break;
            case 'n':
                this.restarMemoria();
                break;
            case 'm':
                this.sacarMemoria();
                break;
            case 'c':
                this.limpiar();
                break;
        }
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
        this.calc();
        this.vPantalla = Math.abs(eval(this.vPantalla));
        document.getElementById('pantalla').value = this.vPantalla;
    }
    cos() {
        this.calc();
        this.vPantalla = Math.cos(eval(this.vPantalla));
        document.getElementById('pantalla').value = this.vPantalla;
    }
    cosh() {
        this.calc();
        this.vPantalla = Math.cosh(eval(this.vPantalla));
        document.getElementById('pantalla').value = this.vPantalla;
    }
    sen() {
        this.calc();
        this.vPantalla = Math.sin(this.vPantalla);
        document.getElementById('pantalla').value = this.vPantalla;
    }
    senh() {
        this.calc();
        this.vPantalla = Math.sinh(this.vPantalla);
        document.getElementById('pantalla').value = this.vPantalla;
    }
    tan() {
        this.calc();
        this.vPantalla = Math.tan(eval(this.vPantalla));
        document.getElementById('pantalla').value = this.vPantalla;
    }
    tanh() {
        this.calc();
        this.vPantalla = Math.tanh(eval(this.vPantalla));
        document.getElementById('pantalla').value = this.vPantalla;
    }
    exp() {
        this.calc();
        this.vPantalla = Math.exp(eval(this.vPantalla));
        document.getElementById('pantalla').value = this.vPantalla;
    }
    sqrt() {
        this.calc();
        this.vPantalla = Math.sqrt(eval(this.vPantalla));
        document.getElementById('pantalla').value = this.vPantalla;
    }
    sqrt3() {
        this.calc();
        this.vPantalla = Math.pow(eval(this.vPantalla), 1 / 3);
        document.getElementById('pantalla').value = this.vPantalla;
    }
    log() {
        this.calc();
        this.vPantalla = Math.log10(eval(this.vPantalla));
        document.getElementById('pantalla').value = this.vPantalla;
    }
    log2() {
        this.calc();
        this.vPantalla = Math.log2(eval(this.vPantalla));
        document.getElementById('pantalla').value = this.vPantalla;
    }
    ln() {
        this.calc();
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
        this.calc();
        this.vPantalla = Math.pow(Math.E, eval(this.vPantalla));
        document.getElementById('pantalla').value = this.vPantalla;
    }
    elevar2() {
        this.calc();
        this.vPantalla = Math.pow(2, eval(this.vPantalla));
        document.getElementById('pantalla').value = this.vPantalla;
    }
    elevar10() {
        this.calc();
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


    tokenize(text) {
        // --- Parse a calculation string into an array of numbers and operators
        const tokens = [];
        let token = '';
        for (const character of text) {
            if ('^*/+-'.indexOf(character) > -1) {
                if (token === '' && character === '-') {
                    token = '-';
                } else {
                    if(!isNaN(token) && !isNaN(parseFloat(token)))
                        tokens.push(new Number(token), character);
                    else
                        tokens.push(token,character);
                    token = '';
                }
            } else {
                token += character;
            }
        }
        if (token !== '') {
            tokens.push(new Number(token));
        }
        console.log(tokens);
        return tokens;
    }



    

}
var calculadora = new CalculadoraCientifica();
