
"use strict";
class MapaEstaticoGoogle {
    constructor() {
        this.mensaje = "Se ha realizado correctamente la petición de geolocalización";
        this.getKebabs();

    }
    getKebabs() {
        //centro mapa oviedo    43.3610796, -5.8474587
        //kebabish              43.3656123, -5.8523236
        //anapurna              43.3639233, -5.8435330
        //autentico             43.3610249, -5.8434975
        //autentico de verdad   43.3598060, -5.8432700
        //ASTUR DONNER          43.3594772, -5.8476551
        this.centro = "43.3610796,-5.8474587";
        this.kebab1 = "43.3656123,-5.8523236";
        this.kebab2 = "43.3639233,-5.8435330";
        this.kebab3 = "43.3610249,-5.8434975";
        this.kebab4 = "43.3598060,-5.8432700";
        this.kebab5 = "43.3594772,-5.8476551";




    }

    getMapaEstaticoGoogle() {


        var apiKey = "&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU";

        var url = "https://maps.googleapis.com/maps/api/staticmap?";

        var centro = "center=" + this.centro;
        var zoom = "&zoom=15";

        var tamaño = "&size=800x600";

        var marcador = "&markers=color:red%7Clabel:S%7C" + this.kebab1;
        marcador += "&markers=color:red%7Clabel:S%7C" + this.kebab2;
        marcador += "&markers=color:red%7Clabel:S%7C" + this.kebab3;
        marcador += "&markers=color:red%7Clabel:S%7C" + this.kebab4;
        marcador += "&markers=color:red%7Clabel:S%7C" + this.kebab5;

        var sensor = "&sensor=false";

        this.imagenMapa = url + centro + zoom + tamaño + marcador + sensor + apiKey;
        document.querySelector("main").innerHTML =  "<img alt='mapa' src='" + this.imagenMapa + "'/>";

    }
}
var miMapa = new MapaEstaticoGoogle();
