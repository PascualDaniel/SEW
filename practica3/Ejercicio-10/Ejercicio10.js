
// Obtener un archivo JSON con lo datos meteorológicos de la estación de Oviedo

"use strict";
class Bitcoin {
   
    //obtain bitcoin data using ajax
    obtainData(){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.coindesk.com/v1/bpi/currentprice/BTC.json');
        xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let response = JSON.parse(xhr.responseText);
                document.querySelector('main p').innerHTML = response.bpi.USD.rate;
            }
        }
    }

}
var bit = new Bitcoin();
