
// Obtener un archivo JSON con lo datos meteorológicos de la estación de Oviedo

"use strict";
class Meteo {
    constructor(){
        this.apikey = "74a2bc9bd02defbf3f66f775755835fc";

        this.ciudad1 = "Aviles";
        this.ciudad2 = "Oviedo";
        this.ciudad3 = "Ferrol";
        this.ciudad4 = "Ribadesella";
        this.ciudad5 = "Pontedeume";

        this.codigoPais = "ES";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.tipo = "&mode=xml";

    }
        
        //this.correcto = "¡Todo correcto! JSON recibido de <a href='http://openweathermap.org'>OpenWeatherMap</a>"
    
    accionBoton(){
        document.querySelector("main").innerHTML = "";
        this.addXML(this.ciudad1);
        this.addXML(this.ciudad2);
        this.addXML(this.ciudad3);
        this.addXML(this.ciudad4);
        this.addXML(this.ciudad5);

    }



    getUrl(ciudad){
        
        return "https://api.openweathermap.org/data/2.5/weather?q=" + ciudad + this.tipo+ this.unidades + this.idioma + "&APPID=" + this.apikey;
    }


    cargarDatos(ciudad){
        $.ajax({
            dataType: "xml",
            url: this.getUrl(ciudad),
            method: 'GET',
            success: function(datos){
                
                var ciudad2                = $('city',datos).attr("name");
                var longitud              = $('coord',datos).attr("lon");
                var latitud               = $('coord',datos).attr("lat");
                var pais                  = $('country',datos).text();
                var amanecer              = $('sun',datos).attr("rise");
                var minutosZonaHoraria    = new Date().getTimezoneOffset();
                var amanecerMiliSeg1970   = Date.parse(amanecer);
                    amanecerMiliSeg1970  -= minutosZonaHoraria * 60 * 1000;
                var amanecerLocal         = (new Date(amanecerMiliSeg1970)).toLocaleTimeString("es-ES");
                var oscurecer             = $('sun',datos).attr("set");          
                var oscurecerMiliSeg1970  = Date.parse(oscurecer);
                    oscurecerMiliSeg1970  -= minutosZonaHoraria * 60 * 1000;
                var oscurecerLocal        = (new Date(oscurecerMiliSeg1970)).toLocaleTimeString("es-ES");
                var temperatura           = $('temperature',datos).attr("value");
                var temperaturaMin        = $('temperature',datos).attr("min");
                var temperaturaMax        = $('temperature',datos).attr("max");
                var temperaturaUnit       = $('temperature',datos).attr("unit");
                var humedad               = $('humidity',datos).attr("value");
                var humedadUnit           = $('humidity',datos).attr("unit");
                var presion               = $('pressure',datos).attr("value");
                var presionUnit           = $('pressure',datos).attr("unit");
                var velocidadViento       = $('speed',datos).attr("value");
                var nombreViento          = $('speed',datos).attr("name");
                var direccionViento       = $('direction',datos).attr("value");
                var codigoViento          = $('direction',datos).attr("code");
                var nombreDireccionViento = $('direction',datos).attr("name");
                var nubosidad             = $('clouds',datos).attr("value");
                var nombreNubosidad       = $('clouds',datos).attr("name");
                var visibilidad           = $('visibility',datos).attr("value");
                var precipitacionValue    = $('precipitation',datos).attr("value");
                var precipitacionMode     = $('precipitation',datos).attr("mode");
                var descripcion           = $('weather',datos).attr("value");
                var horaMedida            = $('lastupdate',datos).attr("value");
                var icon                  = $('weather',datos).attr("icon");
                var horaMedidaMiliSeg1970 = Date.parse(horaMedida);
                    horaMedidaMiliSeg1970 -= minutosZonaHoraria * 60 * 1000;
                var horaMedidaLocal       = (new Date(horaMedidaMiliSeg1970)).toLocaleTimeString("es-ES");
                var fechaMedidaLocal      = (new Date(horaMedidaMiliSeg1970)).toLocaleDateString("es-ES");
                
                var stringDatos = "<h3>Datos meteorológicos de " + ciudad2 + "</h3>";
                    stringDatos += "<ul><li> <img src=\"https://openweathermap.org/img/w/"+icon  +".png\" alt =\""+ciudad+"\"> </li>";
                    stringDatos += "<li>Ciudad: " + ciudad2 + "</li>";
                    stringDatos += "<li>Longitud: " + longitud + " grados</li>";
                    stringDatos += "<li>Latitud: " + latitud + " grados</li>";
                    stringDatos += "<li>País: " + pais + "</li>";
                    stringDatos += "<li>Amanece a las: " + amanecerLocal + "</li>";
                    stringDatos += "<li>Oscurece a las: " + oscurecerLocal + "</li>";
                    stringDatos += "<li>Temperatura: " + temperatura + " grados Celsius</li>";
                    stringDatos += "<li>Temperatura mínima: " + temperaturaMin + " grados Celsius</li>";
                    stringDatos += "<li>Temperatura máxima: " + temperaturaMax + " grados Celsius</li>";
                    stringDatos += "<li>Temperatura (unidades): " + temperaturaUnit + "</li>";
                    stringDatos += "<li>Humedad: " + humedad + " " + humedadUnit + "</li>";
                    stringDatos += "<li>Presión: " + presion + " " + presionUnit + "</li>";
                    stringDatos += "<li>Velocidad del viento: " + velocidadViento + " metros/segundo</li>";
                    stringDatos += "<li>Nombre del viento: " + nombreViento + "</li>";
                    stringDatos += "<li>Dirección del viento: " + direccionViento + " grados</li>";
                    stringDatos += "<li>Código del viento: " + codigoViento + "</li>";
                    stringDatos += "<li>Nombre del viento: " + nombreDireccionViento + "</li>";
                    stringDatos += "<li>Nubosidad: " + nubosidad + "</li>";
                    stringDatos += "<li>Nombre nubosidad: " + nombreNubosidad + "</li>";
                    stringDatos += "<li>Visibilidad: " + visibilidad + " metros</li>";
                    stringDatos += "<li>Precipitación valor: " + precipitacionValue + "</li>";
                    stringDatos += "<li>Precipitación modo: " + precipitacionMode + "</li>";
                    stringDatos += "<li>Descripción: " + descripcion + "</li>";
                    stringDatos += "<li>Hora de la medida: " + horaMedidaLocal + "</li>";
                    stringDatos += "<li>Fecha de la medida: " + fechaMedidaLocal + "</li>";
                    stringDatos += "</ul>";
                
                    document.querySelector("main").innerHTML+= stringDatos
                },
                error: function () {
                    document.querySelector("main").append( "<p>Ciudad no encontrada</p>")
                }
        });
    }

    addXML(ciudad){
        this.cargarDatos(ciudad)
      
 
    }
}
var meteo = new Meteo();
