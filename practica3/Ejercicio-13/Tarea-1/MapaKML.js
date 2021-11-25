"use strict";
class Mapa {
    constructor() {
        this.info;
        this.map;
        this.rutas;
    }

    initialize() {

        var centro = { lat: 43.3672, lng: -5.8502 };
        var mapOptions = {
            zoom: 10,
            napTypeId: 'terrain',
            center: centro
        };
        this.map = new google.maps.Map(document.querySelector("main"), mapOptions);


    }


    cargar(file) {
        var archivo = file[0];

        var lector = new FileReader();


        lector.onload = function (evento) {

        };
        lector.readAsText(archivo);
        lector.onloadend = function () {
            var jsonData = $(lector.result).find("Document");
            var placeMarks = $(jsonData).find("placemark");
         
            $.each(placeMarks, function (placeMark) {
                console.log(placeMarks[placeMark]);
                var coordenadas = $(placeMarks[placeMark]).find("coordinates");
                var CoordenadasParseadas = $(coordenadas).text().split(',');
                
                var name = $(placeMarks[placeMark]).find("name").text();
                var latitud = parseFloat(CoordenadasParseadas[1]);
                var longitud = parseFloat(CoordenadasParseadas[0]);

                var myLatLng = { lat: latitud, lng: longitud };
                
                var punto = new google.maps.Marker({
                    position: myLatLng,
                    map: mapaLoader.map,
                    title: name,
                });
                punto.setMap(mapaLoader.map);
                
            });
    }
    }
}
var mapaLoader = new Mapa();






