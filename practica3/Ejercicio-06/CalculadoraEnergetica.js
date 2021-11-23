"use strict";
class Calculadora {
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
var calculadora = new Calculadora();
