
"use strict";
class MapaGoogle {
    constructor() {
        this.info;
        this.map;
        this.rutas;
    }

    initialize() {

       var centro = {lat: 43.3672, lng: -5.8502} ;
       var mapOptions = {
           zoom:10,
           napTypeId: 'terrain',
           center:centro
       };
       this.map = new google.maps.Map(document.querySelector("main"), mapOptions);
       this.marcador = new google.maps.Marker({position:centro,map:this.map});
       
   }
    
}
var miMapa = new MapaGoogle();
