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
            //Solucion1


            if(Number.isInteger(  this.vPantalla)){

            }
            else{
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
            this.memoria = new Number( eval(this.memoria+"+"+ this.vPantalla));

        } catch (err) {
            this.vPantalla = "Error: " + err;
            document.getElementById('pantalla').value = this.vPantalla;
        }
    }
    //M-
    restarMemoria() {
        try {
            this.calc();
            this.memoria = new Number( eval(this.memoria+"-"+ this.vPantalla));

        } catch (err) {
            this.vPantalla = "Error: " + err;
            document.getElementById('pantalla').value = this.vPantalla;
        }
    }
    //MRC
    sacarMemoria() {

        this.vPantalla = ""+this.memoria;
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

var calculadora = new Calculadora();