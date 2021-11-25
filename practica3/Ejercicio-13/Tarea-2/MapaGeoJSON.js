
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
                var name = propiedades.name;
                var coordenadas = feature.geometry.coordinates;


                var latitud = parseFloat(coordenadas[1]);
                var longitud = parseFloat(coordenadas[0]);
                var myLatLng = { lat: latitud, lng: longitud };
                console.log(myLatLng);
                var marcador = new google.maps.Marker({
                    position: myLatLng,
                    map: mapaLoader.map,
                    title: name,
                });

                marcador.setMap(mapaLoader.map);


            }
        }
    }

}

var mapaLoader = new Mapa();






