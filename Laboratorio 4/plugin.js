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