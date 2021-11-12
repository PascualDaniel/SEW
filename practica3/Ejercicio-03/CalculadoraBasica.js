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
            this.vPantalla = new Number(eval(this.vPantalla));
            document.getElementById('pantalla').value =this.vPantalla;
         }catch(err){
            this.vPantalla = "Error: "+err;
            document.getElementById('pantalla').value =this.vPantalla;
        }
    }
    limpiar(){
        try{    
            this.vPantalla = new Number("0");
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
            document.getElementById('pantalla').v =this.vPantalla;
        }
    }
    //MRC
    sacarMemoria(){

        this.vPantalla = ""+ this.memoria;
        document.getElementById('pantalla').value =this.vPantalla;
         
    }
}

var calculadora = new Calculadora();