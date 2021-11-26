
// Obtener un archivo JSON con los datos de divisas

"use strict";
class Cargador {
    constructor() {

    }




    metodo(files) {

        var archivo = files[0];

        var tipoTexto1 = 'text/plain';
        var tipoTexto2 = 'application/json';
        var tipoTexto3 = 'text/xml';
        if (archivo.type.match(tipoTexto1) || archivo.type.match(tipoTexto2) || archivo.type.match(tipoTexto3)) {
            var lector = new FileReader();
            lector.onload = function (evento) {
                var text = "";
                text+="<p>Nombre del archivo: " + archivo.name+"</p>";
                text+="<p>Tamaño del archivo: " + archivo.size+"</p>";
                text+="<p>Tipo del archivo: " + archivo.type+"</p>";
                text+="<p>Fecha de la última modificación: " + archivo.lastModifiedDate+"</p>";
                text+="<p>Contenido del archivo de texto:"+"</p>";
                text+="<pre>"+lector.result+"</pre>";
                document.querySelector("main").innerHTML=text;
            }
            lector.readAsText(archivo);
        }
        else {
            var text = "Error:  Archivo no válido";

        }


    }


}
var car = new Cargador();

