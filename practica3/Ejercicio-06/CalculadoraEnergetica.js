"use strict";
class Calculadora {
    constructor(){
        this.pila = new Array();
    	this.vPantalla = "0";//valor de la pantalla actual
        this.escribiendo=true;
        this.memoria=0;

        
        document.addEventListener("keypress", function (e) {
            calculadora.onKeyPress(e);
        });
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
                this.suma();
                break;
            case '-':
                this.resta();
                break;
            case '*':
                this.multi();
                break;
            case '/':
                this.div();
                break;
            case '^':
                this.pow();
                break;
            case 'C':
                this.ce();
                break;
            case 'p':
                this.pi();
                break;
            case 'e':
                this.e();
                break;
            case 'a':
                this.abs();
                break;
            case 'c':
                this.cos();
                break;
            case 'C':
                this.cosh();
                break;
            case 's':
                this.sen();
                break;
            case 'S':
                this.senh();
                break;
            case 't':
                this.tan();
                break;
            case 'T':
                this.tanh();
                break;
            case 'x':
                this.exp();
                break;
            case 's':
                this.sqrt();
                break;
            case 'l':
                this.log();
                break;
            case 'L':
                this.ln();
                break;
            case 'i':
                this.inversa();
                break;
            case 'Enter':
                this.igual();
                break;
            case ',':
                this.addElement(keyboardEvent.key);
                break;
            case 'Backspace':
                this.backspace();
                break;
            default:
                break;
        }
    }
   

}
var calculadora = new Calculadora();


class CalculadoraEnergetica extends Calculadora{
    constructor(){
        super();


    }

    onKeyPress(keyboardEvent) {

            }
    
    refrescarPila(){
        var elementosHtml ="";
        elementosHtml +=("<li>"+0+"</li>");
        for(var i  in this.pila){
            elementosHtml +=("<li>"+this.pila[i]+"KWh</li>");
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
    }
    sumarTodo(){
        var suma = 0;
        for(var i in this.pila){
            suma += this.pila[i];
        }
        this.pila = new Array();
        this.pila.push(suma);
        this.refrescarPila();
    }

    bAdd(){
        var nombre = document.querySelector("main p input[type='text']").value
        var cantidad = document.querySelector("main p input[type='number']:nth-of-type(2)").value
        var potencia = document.querySelector("main p input[type='number']:nth-of-type(3)").value
        var eficiencia = document.querySelector("main p select").value;

        var kwh=this.getKWH(cantidad,potencia,eficiencia);
        this.pila.push(kwh);
        this.refrescarPila()

       }

    


    getKWH(cantidad, potencia,eficiencia){
        return parseFloat(cantidad)*parseFloat(potencia) *this.eficienciaCal(eficiencia);
    }

    eficienciaCal(letra){
        switch(letra){
            case "A":
                return 90/100;
            case "B":
                return 80/100;   
            case "C":
                return 70/100;
            case "D":
                return 60/100; 
            default:  
                return 90/100; 
        }
    }
}
var calculadora = new CalculadoraEnergetica();
