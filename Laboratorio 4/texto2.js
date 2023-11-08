// ==UserScript==
// @name         Lab4
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Plugin Lab 4
// @author       Tobías Guerrero Cheuquepán
// @match        https://cripto.tiiny.site/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tiiny.site
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js#sha512-a+SUDuwNzXDvz4XrIcXHuCf089/iJAoN4lmrXJg18XnduKK6YlDHNRalv4yd1N40OKI80tFidF+rqTFKGPoWFQ==
// ==/UserScript==

(function() {
    'use strict';

    function createNewContent() {
        // Mensajes cifrados en Base64
        var mensajesCifrados = [
            'lZz/tIfhiFagxWRPlR/4oA==',
            '9qHjrcZ7sa8=',
            'x1MzIoAB/fA=',
            'jNZ7KNF9Jtg=',
            'GzLqG+EZm2w=',
            'FS1CR7RHUIA=',
            'jOTR5/snS8g=',
            'ZQGHrSk3b9E=',
            'ZavsZkAx6fo=',
            'OHLT8MLfLXEuZ1jCW0T6bQ=='
        ];

        // Nuevo contenido del mensaje en el párrafo (p)
        var newMessage = `
        En un reino lejano, existía un bosque mágico conocido como el Bosque de las Maravillas. En ese lugar, una antigua profecía hablaba de un valiente aventurero llamado Max Gordon con el poder de descubrir los tesoros ocultos.

        Un día, un joven llamado Juan junto a sus amigos perros Bob, Tom y Kyle decidió emprender un viaje hacia el Bosque de las Maravillas. Con su mochila llena de sueños y determinación, se adentró en el bosque en busca de aventuras.

        A medida que exploraba, Juan se encontró con criaturas mágicas, como el majestuoso Dragón de las Nubes y el amigable Hada del Bosque. Estas criaturas le otorgaron regalos especiales que lo ayudaron en su búsqueda.

        Después de muchas semanas de exploración, Juan finalmente llegó al corazón del bosque, donde descubrió una puerta antigua que lo llevó a un mundo secreto lleno de tesoros invaluables. En ese lugar, cumplió la profecía y se convirtió en el legendario "Guardián de los Tesoros".

        La historia de Juan se transmitió de generación en generación, recordando a todos que, con valentía y determinación, se pueden descubrir tesoros ocultos en los lugares más inesperados.
        `;

        // Lista de clases para los contenedores div (M1, M2, ...)
        var divClasses = ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M9", "M10"];

        // Eliminar todo el contenido HTML existente en la página
        document.head.innerHTML = "";
        document.body.innerHTML = "";

        // Crear un nuevo elemento HTML para el mensaje en el párrafo (p)
        var newParagraph = document.createElement("p");
        newParagraph.textContent = newMessage;
        document.body.appendChild(newParagraph);

        // Agregar mensajes cifrados en divs al cuerpo de la página
        for (let i = 0; i < mensajesCifrados.length; i++) {
            var nuevoDiv = document.createElement('div');
            nuevoDiv.className = divClasses[i];
            nuevoDiv.setAttribute('id', mensajesCifrados[i]);
            document.body.appendChild(nuevoDiv);
        }
    }

    // Llamar a la función para actualizar el contenido
    createNewContent();

// Parte 1: Obtener la clave
function obtenerClave() {
    var paragraph = document.querySelector('p'); // Ajusta el selector según la estructura de la página
    var clave;

    if (paragraph) {
        var text = paragraph.textContent;
        var mayusculas = text.match(/[A-Z]/g);

        if (mayusculas) {
            clave = mayusculas.join('');
            console.log("La llave es: " + clave);
        } else {
            console.log("No se encontraron mayúsculas en el texto.");
        }
    } else {
        console.log("No se encontró ningún elemento <p> con el texto.");
    }

    return clave;
}

// Parte 2: Contar los mensajes cifrados
function contarMensajesCifrados() {
    var divElements = document.querySelectorAll('div'); // Ajusta el selector según la estructura de la página
    var mensajesCifrados = [];

    divElements.forEach(function(divElement) {
        var id = divElement.getAttribute('id');
        if (id && /^[A-Za-z0-9+/=]+$/.test(id.trim())) {
            mensajesCifrados.push(divElement);
        }
    });

    console.log("Los mensajes cifrados son: " + mensajesCifrados.length);

    return mensajesCifrados;
}

// Parte 3: Descifrar y mostrar mensajes
function descifrarYMostrarMensajes(mensajesCifrados, clave) {
    for (let i = 0; i < mensajesCifrados.length; i++) {
        let desencriptar = CryptoJS.TripleDES.decrypt(mensajesCifrados[i].getAttribute('id'), CryptoJS.enc.Utf8.parse(clave), { mode: CryptoJS.mode.ECB }).toString(CryptoJS.enc.Utf8);
        console.log(mensajesCifrados[i].getAttribute('id') +" "+ desencriptar);


        let resultadoElemento = document.createElement('p');
        resultadoElemento.textContent = desencriptar;
        document.body.appendChild(resultadoElemento);
    }
}

// Ejecutar las partes en orden
var clave = obtenerClave();
var mensajesCifrados = contarMensajesCifrados();

if (clave && mensajesCifrados.length > 0) {
    // Cargar CryptoJS
    var script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js";
    script.integrity = "sha384-S3wQ/l0OsbJoFeJC81UIr3JOlx/OzNJpRt1bV+yhpWQxPAahfpQtpxBSfn+Isslc";
    script.crossOrigin = 'anonymous';

    script.onload = function() {
        descifrarYMostrarMensajes(mensajesCifrados, clave);
    };

    document.head.appendChild(script);
} else {
    console.log("No se pudo obtener la clave o no se encontraron mensajes cifrados.");
}

})();