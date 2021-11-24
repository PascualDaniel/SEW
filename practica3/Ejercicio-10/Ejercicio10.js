
// Obtener un archivo JSON con lo datos meteorológicos de la estación de Oviedo

"use strict";
class Bitcoin {
    constructor() {
        this.dollars;//valor de la pantalla actual
        this.state = true;
    }
    //obtain bitcoin data using ajax
    obtainData() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.coindesk.com/v1/bpi/currentprice/BTC.json');
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let response = JSON.parse(xhr.responseText);
                document.querySelector('main p').innerHTML = response.bpi.USD.rate + "$";;
                bit.state = false;
            }
        }
    }
    //change the value of the dollars to euros
    changeDollars() {
        if (this.state == true) {
            this.dollars = document.querySelector('main p').innerHTML;
            this.dollars = this.dollars.replace('$', '');
            this.dollars = parseFloat(this.dollars);
            this.dollars = this.dollars * 0.88;
            document.querySelector('main p').innerHTML = this.dollars + "€";
            this.state = false;
        }
    }
    //change the value of the euros to dollars
    changeEuros() {
        if (this.state == false) {
            this.dollars = document.querySelector('main p').innerHTML;
            this.dollars = this.dollars.replace('€', '');
            this.dollars = parseFloat(this.dollars);
            this.dollars = this.dollars / 0.88;
            document.querySelector('main section p').innerHTML = this.dollars + "$";
            this.state = true;
        }
    }



}
var bit = new Bitcoin();
