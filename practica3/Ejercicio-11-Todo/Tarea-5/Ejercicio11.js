
"use strict";
class MapaGoogle {
    constructor() {

        this.info;
        this.map;
        this.rutas;
    }

    initialize() {
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
        var centro = { lat: 43.3672, lng: -5.8502 };
        var mapOptions = {
            zoom: 10,
            napTypeId: 'terrain',
            center: centro
        };
        this.map = new google.maps.Map( document.querySelector("main"), mapOptions);
      
    }
    getPosicion(posicion) {
        this.mensaje = "Se ha realizado correctamente la petición de geolocalización";
        this.longitud = posicion.coords.longitude;
        this.latitud = posicion.coords.latitude;
        this.precision = posicion.coords.accuracy;
        this.altitud = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo = posicion.coords.heading;
        this.velocidad = posicion.coords.speed;
    }
    getLongitud() {
        return parseFloat(this.longitud);
    }
    getLatitud() {
        return parseFloat(this.latitud);
    }
    getAltitud() {
        return parseFloat(this.altitud);
    }
    verErrores(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                this.mensaje = "El usuario no permite la petición de geolocalización"
                break;
            case error.POSITION_UNAVAILABLE:
                this.mensaje = "Información de geolocalización no disponible"
                break;
            case error.TIMEOUT:
                this.mensaje = "La petición de geolocalización ha caducado"
                break;
            case error.UNKNOWN_ERROR:
                this.mensaje = "Se ha producido un error desconocido"
                break;
        }
    }
    centrar() {
        try {
            var pos = new google.maps.LatLng(this.latitud, this.longitud);
            this.marcador = new google.maps.Marker({ position: pos, map: this.map });
            this.map.panTo(pos);
        } catch (error) {
            this.verErrores(error);
        }
       

    }
}
var miMapa = new MapaGoogle();
