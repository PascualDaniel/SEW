
// Obtener un archivo JSON con los datos de divisas

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
        this.map = new google.maps.Map(document.querySelector('main'), mapOptions);


    }

   //load a geojson file and add its points to the map
   cargarGeoJSON(file) {
    var archivo = file[0];
    var lector = new FileReader();
    lector.readAsText(archivo);
    lector.onloadend = (event) => {
        var contenido = event.target.result;
        var geoJson = JSON.parse(contenido);
        var features = geoJson.features;
        this.info = new google.maps.InfoWindow();
        for (var i = 0; i < features.length; i++) {
            var feature = features[i];
            var propiedades = feature.properties;
            
            var coordenadas = feature.geometry.coordinates;
            
            var punto = coordenadas[0];
            var latitud = punto[1];
            var longitud = punto[0];
            var latlng = new google.maps.LatLng(latitud, longitud);
            var marcador = new google.maps.Marker({
                position: latlng,
                map: mapaLoader.map,
                title: propiedades.name
            });
            console.log(marcador);
            marcador.setMap(mapaLoader.map);

           
        }
    }
}
    cargar(file) {
        var archivo = file[0];

        var lector = new FileReader();


        lector.onload = function (evento) {

        }
        lector.readAsText(archivo);
        var mapaLocal = this.map;
        lector.onloadend = function () {
            var jsonData = JSON.parse(lector.result);

            for (var i = 0; i < jsonData.features.length; i++) {
                var coordenadas = jsonData.features[i].geometry.coordinates;
                const CoordenadasLinea = [];

                for (var j = 0; j < coordenadas.length; j++) {
                    var punto = new Object();
                    punto.lat = parseFloat(coordenadas[j][1]);
                    punto.lng = parseFloat(coordenadas[j][0]);
                    CoordenadasLinea.push(punto);
                }
                const lineas = new google.maps.Polyline({
                    path: CoordenadasLinea,
                    geodesic: true,
                    strokeColor: "#FF0000",
                    strokeOpacity: 1.0,
                    strokeWheight: 2,
                    map: mapaLocal

                });
                lineas.setMap(mapaLocal)
            }


        };



    }
}

var mapaLoader = new Mapa();






