"use strict";


class Peliculas {
    constructor() {
        this.nFilas = 0;
    }
    Ocultar() {
        $("main section:nth-of-type(2) p").hide();
    }
    Mostrar() {
        $("main section:nth-of-type(2) p").show();
    }
    accionModificar() {
        var text = $("main section:nth-of-type(1) input[title='Cambiar']").val();
        this.modificar(text);

    }
    modificar(texto) {
        $("main section:nth-of-type(1) p").text(texto);
    }
    accionAñadir() {
        var punt1 = $("main section:nth-of-type(3) p input:nth-of-type(1)").val();
        var punt2 = $("main section:nth-of-type(3) p input:nth-of-type(2)").val();
        var punt3 = $("main section:nth-of-type(3) p input:nth-of-type(3)").val();
        this.addATabla(punt1, punt2, punt3, this.nFilas);
        this.nFilas++;

    }
    addATabla(punt1, punt2, punt3, id) {
        $("tbody").append("<tr><th>" + id + "</th> <td>" + punt1 + "</td> <td >" + punt2 + "</td> <td>" + punt3 + "</td> <td>0</td>  </tr> ");

    }
    sumarFilasAction() {




        $('table thead th').each(function (i) {
            var total = 0;
            $('table tbody tr').each(function () {
                var value = parseInt($('td', this).eq(i).text());
                if (!isNaN(value)) {
                    total += value;
                }
            });
            $('table tfoot td').eq(i).text(total);

        });



    }
    sumarColumnasAction() {
        $('tbody tr').each(function () {
            var suma = 0
            $(this).find('td').not(":last").each(function () {
                var n = $(this).text();
                if (!isNaN(n) && n.length !== 0) {
                    suma += parseFloat(n);
                }
            });
            //set the value of currents rows sum to the total-combat element in the current row
            $('td:last', this).text(suma);
        });


    }






    removeAction() {
        //  this.remove("tbody")
        $("tbody *").children().remove();
        this.nFilas = 0;

    }


    recorrerDocumento() {

        $("*", document.body).each(function () {
            var etiquetaPadre = $(this).parent().get(0).tagName;
            $(this).prepend(document.createTextNode("Etiqueta padre : <" + etiquetaPadre + "> elemento : <" + $(this).get(0).tagName + "> valor: "));
        });
    }








}

var pe = new Peliculas();


