
// Obtener un archivo JSON con lo datos meteorológicos de la estación de Oviedo

"use strict";
class Meteo {
    constructor() {
        this.apikey = "74a2bc9bd02defbf3f66f775755835fc";

        this.ciudad1 = "Aviles";
        this.ciudad2 = "Oviedo";
        this.ciudad3 = "Ferrol";
        this.ciudad4 = "Ribadesella";
        this.ciudad5 = "Pontedeume";




        this.codigoPais = "ES";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";

        //this.correcto = "¡Todo correcto! JSON recibido de <a href='http://openweathermap.org'>OpenWeatherMap</a>"
    }
    accionBoton() {
        this.addJSON(this.ciudad1);
        this.addJSON(this.ciudad2);
        this.addJSON(this.ciudad3);
        this.addJSON(this.ciudad4);
        this.addJSON(this.ciudad5);

    }



    getUrl(ciudad) {
        return "https://api.openweathermap.org/data/2.5/weather?q=" + ciudad + "," + this.codigoPais + this.unidades + this.idioma + "&APPID=" + this.apikey;
    
    }


    cargarDatos(ciudad) {
        $.ajax({
            dataType: "json",
            url: this.getUrl(ciudad),
            method: 'GET',
            success: function (datos) {


                //Presentación de los datos contenidos en JSON

                var stringDatos = "<h3>"+ciudad+"</h3><ul><li> <img src=\"https://openweathermap.org/img/w/" + datos.weather[0].icon + ".png\"> </li>";
                stringDatos += "<li>Ciudad: " + datos.name + "</li>";
                stringDatos += "<li>País: " + datos.sys.country + "</li>";
                stringDatos += "<li>Latitud: " + datos.coord.lat + " grados</li>";
                stringDatos += "<li>Longitud: " + datos.coord.lon + " grados</li>";
                stringDatos += "<li>Temperatura: " + datos.main.temp + " grados Celsius</li>";
                stringDatos += "<li>Temperatura máxima: " + datos.main.temp_max + " grados Celsius</li>";
                stringDatos += "<li>Temperatura mínima: " + datos.main.temp_min + " grados Celsius</li>";
                stringDatos += "<li>Presión: " + datos.main.pressure + " milibares</li>";
                stringDatos += "<li>Humedad: " + datos.main.humidity + " %</li>";
                stringDatos += "<li>Amanece a las: " + new Date(datos.sys.sunrise * 1000).toLocaleTimeString() + "</li>";
                stringDatos += "<li>Oscurece a las: " + new Date(datos.sys.sunset * 1000).toLocaleTimeString() + "</li>";
                stringDatos += "<li>Dirección del viento: " + datos.wind.deg + " grados</li>";
                stringDatos += "<li>Velocidad del viento: " + datos.wind.speed + " metros/segundo</li>";
                stringDatos += "<li>Hora de la medida: " + new Date(datos.dt * 1000).toLocaleTimeString() + "</li>";
                stringDatos += "<li>Fecha de la medida: " + new Date(datos.dt * 1000).toLocaleDateString() + "</li>";
                stringDatos += "<li>Descripción: " + datos.weather[0].description + "</li>";
                stringDatos += "<li>Visibilidad: " + datos.visibility + " metros</li>";
                stringDatos += "<li>Nubosidad: " + datos.clouds.all + " %</li></ul>";

                document.querySelector("section").innerHTML+= stringDatos
            },
            error: function () {
                document.querySelector("section").appendChild( "<p>Ciudad no encontrada</p>")
            }
        });
 
    }

    addJSON(ciudad) {
        //Muestra el archivo JSON recibido

       this.cargarDatos(ciudad)
      


    }
}
var meteo = new Meteo();
