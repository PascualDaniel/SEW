"use strict";
class Calculadora {
    constructor(){
    	this.vPantalla = "0";//valor de la pantalla actual
    	this.memoria="0";
	}
    addElement(x) {
        if(this.vPantalla == "0"){
            this.vPantalla = x;
        }else{
         this.vPantalla += x;
        }
        document.getElementById('pantalla').value=this.vPantalla;
    }
    calc(){
         try{
             //Solucion1

             const tokens =this.tokenize(this.vPantalla);
          //  print(tokens);
            this.vPantalla = eval(tokens.join(''));

            document.getElementById('pantalla').value =this.vPantalla;
         }catch(err){
            this.vPantalla = "Error: "+err;
            document.getElementById('pantalla').value =this.vPantalla;
        }
    }
    limpiar(){
        try{    
            this.vPantalla = "0";
            document.getElementById('pantalla').value =this.vPantalla;
        }catch(err){
            this.vPantalla = "Error: "+err;
            document.getElementById('pantalla').value =this.vPantalla;
        }
    }
    //M+
    sumarMemoria(){
        try{    
            this.memoria = eval(this.memoria+" + "+ this.vPantalla);

        }catch(err){
            this.vPantalla = "Error: "+err;
            document.getElementById('pantalla').value =this.vPantalla;
        }
    }
    //M-
    restarMemoria(){
        try{    
            this.memoria = eval(this.memoria+" - "+ this.vPantalla);

        }catch(err){
            this.vPantalla = "Error: "+err;
            document.getElementById('pantalla').value =this.vPantalla;
        }
    }
    //MRC
    sacarMemoria(){

        this.vPantalla = ""+ this.memoria;
        document.getElementById('pantalla').value =this.vPantalla;
         
    }

    tokenize(s) {
        // --- Parse a calculation string into an array of numbers and operators
        const r = [];
        let token = '';
        for (const character of s) {
            if ('^*/+-'.indexOf(character) > -1) {
                if (token === '' && character === '-') {
                    token = '-';
                } else {
                    r.push(new Number(token), character);
                    token = '';
                }
            } else {
                token += character;
            }
        }
        if (token !== '') {
            r.push(new Number(token));
        }
        console.log(r);
        return r;
    }
    
}

var calculadora = new Calculadora();