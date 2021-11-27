"use strict";
class Calculadora {
    constructor(){
        this.pila = new Array();
    	this.vPantalla = "0";//valor de la pantalla actual
        this.escribiendo=true;
        this.memoria=0;
    }

    mmas(){
        this.memoria +=  new Number(this.vPantalla);
    }
    mmenos(){
        this.memoria -=  new Number(this.vPantalla);
    }
    mlimpiar(){
        this.memoria +=  0;
    }
    msacar(){
 
        this.vPantalla= this.memoria;
        this.escribiendo=true;

        document.getElementById("pantalla").value = this.vPantalla;
    
    }
    addElement(elemento){
        if(this.escribiendo){
            this.vPantalla= elemento;
            this.escribiendo=false;
        }
        else{
            this.vPantalla+=elemento;
        }
        document.getElementById("pantalla").value = this.vPantalla;
    }

    enter(){
        this.pila.push(this.vPantalla);
        this.refrescarPila();
        this.escribiendo=true;
        this.vPantalla="0";
        document.getElementById("pantalla").value = this.vPantalla;
    }
    refrescarPila(){
        var elementosHtml ="";
        elementosHtml +=("<li>"+0+"</li>");
        for(var i  in this.pila){
            elementosHtml +=("<li>"+this.pila[i]+"</li>");
        }
        document.querySelector("ul").innerHTML = elementosHtml;
    }

    suma(){
        if(this.pila.length>1){
            var num = new Number(this.pila.pop());
            var num2 = new Number(this.pila.pop());
            this.pila.push(num + num2);
            this.refrescarPila();
        }
        document.getElementById("pantalla").value =this.vPantalla;
    }
    resta(){
        if(this.pila.length>1){
            var num = new Number(this.pila.pop());
            var num2 = new Number(this.pila.pop());
            this.pila.push(num - num2);
            this.refrescarPila();
        }
        document.getElementById("pantalla").value =this.vPantalla;
    }
    multi(){
        if(this.pila.length>1){
            var num = new Number(this.pila.pop());
            var num2 = new Number(this.pila.pop());
            this.pila.push(num * num2);
            this.refrescarPila();
        }
        document.getElementById("pantalla").value =this.vPantalla;
    }
    div(){
        if(this.pila.length>1){
            var num = new Number(this.pila.pop());
            var num2 = new Number(this.pila.pop());
            this.pila.push(num / num2);
            this.refrescarPila();
        }
        document.getElementById("pantalla").value =this.vPantalla;
    }
    pow(){
        if(this.pila.length>0){
            var num = new Number(this.pila.pop());
            this.vPantalla=Math.pow( new Number(this.vPantalla), num ) ;
            this.refrescarPila();
        }
        document.getElementById("pantalla").value =this.vPantalla;
    }

    limpiar(){
        this.ce();
        this.pila=new Array();
        this.refrescarPila();
    }
    ce(){
        this.escribiendo=true;
        this.vPantalla = "0";
        document.getElementById('pantalla').value = this.vPantalla;
    }

    pi() {
        this.escribiendo=true;
        this.vPantalla = Math.PI;
        document.getElementById('pantalla').value = this.vPantalla;

    }
    e() {
        this.escribiendo=true;
        this.vPantalla = Math.E;
        document.getElementById('pantalla').value = this.vPantalla;

    }

    abs() {
        this.vPantalla = Math.abs(new Number(this.vPantalla));
        document.getElementById('pantalla').value = this.vPantalla;
    }
    cos() {
        this.vPantalla = Math.cos(new Number(this.vPantalla));
        document.getElementById('pantalla').value = this.vPantalla;
    }
    cosh() {
        this.vPantalla = Math.cosh(new Number(this.vPantalla));
        document.getElementById('pantalla').value = this.vPantalla;
    }
    sen() {
        this.vPantalla = Math.sin(new Number(this.vPantalla));
        document.getElementById('pantalla').value = this.vPantalla;
    }
    senh() {
        this.vPantalla = Math.sinh(new Number(this.vPantalla));
        document.getElementById('pantalla').value = this.vPantalla;
    }
    tan() {
        this.vPantalla = Math.tan(new Number(this.vPantalla));
        document.getElementById('pantalla').value = this.vPantalla;
    }
    tanh() {
        this.vPantalla = Math.tanh(new Number(this.vPantalla));
        document.getElementById('pantalla').value = this.vPantalla;
    }
    exp() {
        this.vPantalla = Math.exp(new Number(this.vPantalla));
        document.getElementById('pantalla').value = this.vPantalla;
    }
    sqrt() {
        if(this.pila.length>0){
        var num = new Number(this.pila.pop());
        this.vPantalla = Math.sqrt(new Number(num));
        this.refrescarPila();
        document.getElementById('pantalla').value = this.vPantalla;
        }
    }
    log() {
        this.vPantalla = Math.log10(new Number(this.vPantalla));
        document.getElementById('pantalla').value = this.vPantalla;
    }
    ln() {
        this.vPantalla = Math.log(new Number(this.vPantalla));
        document.getElementById('pantalla').value = this.vPantalla;
    }
    inversa() {
        this.vPantalla = 1/new Number(this.vPantalla) ;
        document.getElementById('pantalla').value = this.vPantalla;
    }

 

   

}
var calculadora = new Calculadora();
