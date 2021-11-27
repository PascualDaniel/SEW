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
            this.vPantalla= num + num2;
            this.refrescarPila();
        }
        document.getElementById("pantalla").value =this.vPantalla;
    }
    resta(){
        if(this.pila.length>1){
            var num = new Number(this.pila.pop());
            var num2 = new Number(this.pila.pop());
            this.vPantalla= num - num2;
            this.refrescarPila();
        }
        document.getElementById("pantalla").value =this.vPantalla;
    }
    multi(){
        if(this.pila.length>1){
            var num = new Number(this.pila.pop());
            var num2 = new Number(this.pila.pop());
            this.vPantalla= num * num2;
            this.refrescarPila();
        }
        document.getElementById("pantalla").value =this.vPantalla;
    }
    div(){
        if(this.pila.length>1){
            var num = new Number(this.pila.pop());
            var num2 = new Number(this.pila.pop());
            this.vPantalla= num / num2;
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

class CalculadoraEnergetica extends Calculadora{
    constructor(){
        this.pila = new Array();
        this.nfilas=0;
        this.kwhTotal=0;
        this.dineroTotal=0;
    }
    
    bcalcular(){
        var nombre = document.getElementById("nombre").value
        var cantidad = document.getElementById("cantidad").value
        var potencia = document.getElementById("potencia").value
        var eficiencia = document.getElementById("Eficiencia").value;
        var tiempo = document.getElementById("tiempo").value
        var dias = document.getElementById("dias").value

        var kwh=this.getKWH(cantidad,potencia,eficiencia,tiempo,dias);
        var dinero =this.getPrecioMedio(kwh);

        this.sumar(kwh,dinero);
        this.creaFila(nombre,cantidad, potencia,eficiencia,tiempo,dias,kwh,dinero)
    }

    
    sumar(kwh,dinero){
        this.kwhTotal+=parseFloat(kwh);
        this.dineroTotal+=parseFloat(dinero) ;
        document.getElementById("KWHTotal").innerText = this.kwhTotal;
        document.getElementById("DineroTotal").innerText =this.dineroTotal+"€";
        
    }

    creaFila(nombre,cantidad, potencia,eficiencia,tiempo,dias,kwh,dinero){
        var row = document.createElement("TR")

        var nom = document.createElement("TD")
        nom.appendChild(document.createTextNode(nombre));
        row.appendChild(nom);
        
        var can = document.createElement("TD")
        can.appendChild(document.createTextNode(cantidad));
        row.appendChild(can);

        var po = document.createElement("TD")
        po.appendChild(document.createTextNode(potencia));
        row.appendChild(po);
        
        var ef = document.createElement("TD")
        ef.appendChild(document.createTextNode(eficiencia));
        row.appendChild(ef);

        var ti = document.createElement("TD")
        ti.appendChild(document.createTextNode(tiempo));
        row.appendChild(ti);

        var di = document.createElement("TD")
        di.appendChild(document.createTextNode(dias));
        row.appendChild(di);

        var k = document.createElement("TD")
        k.appendChild(document.createTextNode(kwh));
        row.appendChild(k);
        
        var di = document.createElement("TD")
        di.appendChild(document.createTextNode(dinero));
        row.appendChild(di);

        document.getElementById("datos").appendChild(row);
    }

    getKWH(cantidad, potencia,eficiencia,tiempo,dias){
        return parseFloat(cantidad)*parseFloat(potencia)*   this.eficienciaCal(eficiencia)/100*parseFloat(tiempo)*parseFloat(dias);
    }
    getPrecioMedio(kwh){
        return 0.1213 *parseFloat(kwh);
    }

    eficienciaCal(letra){
        switch(letra){
            case letra =="A":
                return 90;
            case letra =="B":
                return 80;   
            case letra =="C":
                return 70;
            case letra =="D":
                return 60; 
            default:  
                return 90; 
        }
    }

}
var calculadora = new CalculadoraEnergetica();
