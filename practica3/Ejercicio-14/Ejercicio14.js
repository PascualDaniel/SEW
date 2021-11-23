


class Ejercicio14 {
    constructor() {
        var img;

    }

    metodoBoton(files) {
        this.cargar(files);

        //wait for image to load
        document.querySelector("img").onload = function () {
            eje14.original();
        }


    }
    invertir() {
        var canvas = document.querySelector('canvas');
        var ctx = canvas.getContext('2d');
        var img = document.querySelector("img");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (var i = 0; i < data.length; i += 4) {
            data[i] = 255 - data[i];         // red
            data[i + 1] = 255 - data[i + 1]; // green
            data[i + 2] = 255 - data[i + 2]; // blue
        }
        ctx.putImageData(imageData, 0, 0);
    }
    original() {
        var canvas = document.querySelector('canvas');
        var ctx = canvas.getContext('2d');
        var img = document.querySelector("img");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    };

    grises() {
        var canvas = document.querySelector('canvas');
        var ctx = canvas.getContext('2d');
        var img = document.querySelector("img");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (var i = 0; i < data.length; i += 4) {
            var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = avg; // red
            data[i + 1] = avg; // green
            data[i + 2] = avg; // blue
        }
        ctx.putImageData(imageData, 0, 0);
    };

    pantallaCompleta() {
        var elem = document.getElementById("ImagenEditada");
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
    }


    cargar(files) {
        this.cargarImagen(files);
        document.querySelector("img").hidden = false;

    }



    cargarImagen(files) {


        var archivo = files[0];

        var tipo = 'image.*';

        if (archivo.type.match(tipo)) {

            var reader = new FileReader();
            reader.onload = function () {

                document.querySelector("img").src = reader.result;
            }

            reader.readAsDataURL(archivo);
        }
    }


    allowDrop(ev) {
        ev.preventDefault();
    }

    drag(ev) {
        ev.dataTransfer.setData("value", ev.target.value);
    }
    drag2(ev) {
        ev.dataTransfer.setData("value", ev.target.value);
    }
    drag3(ev) {
        ev.dataTransfer.setData("value", ev.target.value);
    }

    drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("value");
        if (data == "Imagen Normal") {
            this.original();
        }
        if (data == "Invertir Imagen") {
            this.invertir();
        }
        if (data == "Escala de Grises") {
            this.grises();
        }

    }

}

var eje14 = new Ejercicio14();


