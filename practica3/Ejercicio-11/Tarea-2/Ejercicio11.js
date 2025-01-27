"use strict";
class Geolocalizacion {
    constructor() {
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this),this.verErrores.bind(this));
    }
    getPosicion(posicion) {
        this.longitud = posicion.coords.longitude;
        this.latitud = posicion.coords.latitude;
        this.precision = posicion.coords.accuracy;
        this.altitud = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo = posicion.coords.heading;
        this.velocidad = posicion.coords.speed;

    }

    getLongitud() {
        return this.longitud;
    }
    getLatitud() {
        return this.latitud;
    }
    getAltitud() {
        return this.altitud;
    }

    ver() {

        var datos = "";
        datos += "<p>Longitud: " + this.longitud + " grados</p>";
        datos+='<p>Latitud: '+this.latitud +' grados</p>';
        datos+='<p>Precisión de la latitud y longitud: '+ this.precision +' metros</p>';
        datos+='<p>Altitud: '+ this.altitude +' metros</p>';
        datos+='<p>Precisión de la altitud: '+ this.precisionAltitud +' metros</p>'; 
        datos+='<p>Rumbo: '+ this.rumbo +' grados</p>'; 
        datos+='<p>Velocidad: '+ this.velocidad +' metros/segundo</p>';
        document.querySelector("section").innerHTML = datos;


    }
    verErrores(error){
        switch(error.code) {
        case error.PERMISSION_DENIED:
            document.querySelector("section").innerHTML = "<p>El usuario no permite la petición de geolocalización</p>";
            break;
        case error.POSITION_UNAVAILABLE:
            document.querySelector("section").innerHTML = "<p>Información de geolocalización no disponible</p>";
            break;
        case error.TIMEOUT:
            document.querySelector("section").innerHTML = "<p>La petición de geolocalización ha caducado</p>";
            break;
        case error.UNKNOWN_ERROR:
            document.querySelector("section").innerHTML = "<p>Se ha producido un error desconocido</p>";
            break;
        }
    }

}
var geo = new Geolocalizacion();
