"use strict";
class Calculadora {
    constructor(){
        this.pila = new Array();
    	this.vPantalla = "0";//valor de la pantalla actual
        this.escribiendo=true;
        this.memoria=0;
    }

    mmas(){
        this.memoria +=  parseFloat(this.vPantalla);
    }
    mmenos(){
        this.memoria -=  parseFloat(this.vPantalla);
    }
    mlimpiar(){
        this.memoria +=  0;
    }
    msacar(){
 
        this.vPantalla= this.memoria;
        this.escribiendo=true;

        document.getElementById("entrada").innerText = this.vPantalla;
    
    }
    addElement(elemento){
        if(this.escribiendo){
            this.vPantalla= elemento;
            this.escribiendo=false;
        }
        else{
            this.vPantalla+=elemento;
        }
        document.getElementById("entrada").innerText = this.vPantalla;
    }

    enter(){
        this.pila.push(this.vPantalla);
        this.refrescarPila();
        this.escribiendo=true;
        this.vPantalla="0";
        document.getElementById("entrada").innerText = this.vPantalla;
    }
    refrescarPila(){
        var elementosHtml ="";
        elementosHtml +=("<p>"+0+"</p>");
        for(var i  in this.pila){
            elementosHtml +=("<p>"+this.pila[i]+"</p>");
        }
        document.getElementById("pila").innerHTML = elementosHtml;
    }

    suma(){
        if(this.pila.length>1){
            var num = parseFloat(this.pila.pop());
            var num2 = parseFloat(this.pila.pop());
            this.vPantalla= num + num2;
            this.refrescarPila();
        }
        document.getElementById("entrada").innerText =this.vPantalla;
    }
    resta(){
        if(this.pila.length>1){
            var num = parseFloat(this.pila.pop());
            var num2 = parseFloat(this.pila.pop());
            this.vPantalla= num - num2;
            this.refrescarPila();
        }
        document.getElementById("entrada").innerText =this.vPantalla;
    }
    multi(){
        if(this.pila.length>1){
            var num = parseFloat(this.pila.pop());
            var num2 = parseFloat(this.pila.pop());
            this.vPantalla= num * num2;
            this.refrescarPila();
        }
        document.getElementById("entrada").innerText =this.vPantalla;
    }
    div(){
        if(this.pila.length>1){
            var num = parseFloat(this.pila.pop());
            var num2 = parseFloat(this.pila.pop());
            this.vPantalla= num / num2;
            this.refrescarPila();
        }
        document.getElementById("entrada").innerText =this.vPantalla;
    }
    pow(){
        if(this.pila.length>0){
            var num = parseFloat(this.pila.pop());
            this.vPantalla=Math.pow( parseFloat(this.vPantalla), num ) ;
            this.refrescarPila();
        }
        document.getElementById("entrada").innerText =this.vPantalla;
    }

    limpiar(){
        this.ce();
        this.pila=new Array();
        this.refrescarPila();
    }
    ce(){
        this.escribiendo=true;
        this.vPantalla = "0";
        document.getElementById('entrada').innerText = this.vPantalla;
    }

    pi() {
        this.escribiendo=true;
        this.vPantalla = Math.PI;
        document.getElementById('entrada').innerText = this.vPantalla;

    }
    e() {
        this.escribiendo=true;
        this.vPantalla = Math.E;
        document.getElementById('entrada').innerText = this.vPantalla;

    }

    abs() {
        this.vPantalla = Math.abs(parseFloat(this.vPantalla));
        document.getElementById('entrada').innerText = this.vPantalla;
    }
    cos() {
        this.vPantalla = Math.cos(parseFloat(this.vPantalla));
        document.getElementById('entrada').innerText = this.vPantalla;
    }
    cosh() {
        this.vPantalla = Math.cosh(parseFloat(this.vPantalla));
        document.getElementById('entrada').innerText = this.vPantalla;
    }
    sen() {
        this.vPantalla = Math.sin(parseFloat(this.vPantalla));
        document.getElementById('entrada').innerText = this.vPantalla;
    }
    senh() {
        this.vPantalla = Math.sinh(parseFloat(this.vPantalla));
        document.getElementById('entrada').innerText = this.vPantalla;
    }
    tan() {
        this.vPantalla = Math.tan(parseFloat(this.vPantalla));
        document.getElementById('entrada').innerText = this.vPantalla;
    }
    tanh() {
        this.vPantalla = Math.tanh(parseFloat(this.vPantalla));
        document.getElementById('entrada').innerText = this.vPantalla;
    }
    exp() {
        this.vPantalla = Math.exp(parseFloat(this.vPantalla));
        document.getElementById('entrada').innerText = this.vPantalla;
    }
    sqrt() {
        if(this.pila.length>0){
        var num = parseFloat(this.pila.pop());
        this.vPantalla = Math.sqrt(parseFloat(num));
        this.refrescarPila();
        document.getElementById('entrada').innerText = this.vPantalla;
        }
    }
    log() {
        this.vPantalla = Math.log10(parseFloat(this.vPantalla));
        document.getElementById('entrada').innerText = this.vPantalla;
    }
    ln() {
        this.vPantalla = Math.log(parseFloat(this.vPantalla));
        document.getElementById('entrada').innerText = this.vPantalla;
    }
    inversa() {
        this.vPantalla = 1/parseFloat(this.vPantalla) ;
        document.getElementById('pantalla').innerText = this.vPantalla;
    }

 

   

}
var calculadora = new Calculadora();
