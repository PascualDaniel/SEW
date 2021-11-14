
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
                $("#name").text("Nombre del archivo: " + archivo.name);
                $("#size").text("Tamaño del archivo: " + archivo.size);
                $("#type").text("Tipo del archivo: " + archivo.type);
                $("#date").text("Fecha de la última modificación: " + archivo.lastModifiedDate);
                $("#content").text("Contenido del archivo de texto:");
                $("#contenido").text(lector.result)
            }
            lector.readAsText(archivo);
        }
        else {
            $("#name").text("Nombre del archivo: " );
            $("#size").text("Tamaño del archivo: " );
            $("#type").text("Tipo del archivo: " );
            $("#date").text("Fecha de la última modificación: ");
            $("#contenido").text("Error:  Archivo no válido");

        }


    }


}
var car = new Cargador();

