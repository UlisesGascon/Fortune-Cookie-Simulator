// Libreria de mensajes
var fortune = require('./cookieMessages');

var five = require("johnny-five");
var board = new five.Board();
// Librerias para WebSockets
var uri="/index.html";
var fs = require('fs');
var http = require('http');
var socket = require("socket.io");

/*
  ====== Opciones del Script =======
*/

// WebSockets 
var wsMode = true;

// Modo Geek
var geekMode = false;

// Depurador
var debugMode = false;

// localhost:PUERTO!
var wsPort = 3000;

// Si esta activado el modo depuración se Imprime esta información 
if (debugMode) {
  console.log("----------------------");
  console.log("Modo depuración Activado!");
  console.log("----------------------");
};

// Arrancamos Arduino
board.on("ready", function() {

/*
  ====== WEBSOCKETS y SERVIDOR WEB =======
*/

// Arrancamos el servidor si wsMode es true
if (wsMode) {
  // referenciamos a index.html
  var page = fs.readFileSync(__dirname + uri);

  // Controlamos la respuesta
   function handler(request, response)
  {
    response.write(page);
    response.end();
  }
  // Levantamos el servidor
  var app = http.createServer(function(r, s){ handler(r,s); });
  app.listen(wsPort);
  var listener = socket.listen(app, { log: false });

  // Función al inicio de la conexion con el cliente e iniciación del programa en caso de pulsar el botón en la web.
  function wsStart(socket)
  {
    socket.emit('message', 'ARE YOU LUCKY TODAY? OPEN THE COOKIE!!');
    socket.on('called', function(){
      // Depuración
      if (debugMode) {
      console.log( "Button pressed via web" );
      };
      // Iniciamos el programa
      initFortune (socket);
    });
  }   
  listener.sockets.on('connection', function (socket) { wsStart(socket);} );
};

/*
    Definimos el hardware
*/


var lcd = new five.LCD({
    controller: "LCM1602",
    pins: ["A5", "A4"],
    rows: 4,
    cols: 20
});


var button = new five.Button(2);

// Arrancamos el LCD con la bienvenida
initLCD();

// Cuando se pulsa el botón... 
button.on("press", function() {

    if (debugMode) {
    console.log( "Button pressed" );
    };

// Iniciamos el programa
    initFortune();
});

// Función... mensaje de bienvenida en el LCD
function initLCD () {
      lcd.clear();
      lcd.cursor(0, 0).print("== FORTUNE COOKIE ==");
      lcd.cursor(1, 0).print("PLEASE, PRESS ME!!");  
      lcd.cursor(2, 0).print("ARE YOU LUCKY TODAY?"); 
      lcd.cursor(3, 0).print("===================="); 
};


// Función que controla la ejecución de todo el programa y elige los mensajes
function initFortune (socket) {

var theMessage = "empty";

// Elección de un número al azar segun modo Geek o normal y actualización de la variable theMessage con el mensaje correcto.
  if (geekMode) {
    var number = Math.floor(Math.random() * 18) + 0;
    theMessage = fortune.geeks[number];
    console.log(theMessage);

  } else {
    var number = Math.floor(Math.random() * 349) + 0;
    theMessage = fortune.random[number];
        console.log(theMessage);
  };


  if (debugMode) {
    console.log("The message: " +theMessage);
  };

// Imprimiendo los resultados por consola
  console.log("-------------------");
  console.log("Your fortune today:");
  console.log(theMessage);
  console.log("-------------------");

// Limpiamos el LCD del mensaje de Bienvenida   
    lcd.clear();

/*
 function developed by Hendrik Lammers
 more info: https://gist.github.com/hendriklammers/5231994
*/
function splitString (string, size) {
  var res = new RegExp('.{1,' + size + '}', 'g');
  return string.match(res);
}

/*
          ==== MANIPULACIÓN E IMPRESIÓN DEL MENSAJE ====
  Selección del tipo de impresión en función de la longitud del mensaje
*/

    //Mensaje menor o igual a 20 caracteres (1 linea del LCD)
    if(theMessage.length <= 20) {
      
      // Impresión para el LCD
      lcd.cursor(0, 0).print("== FORTUNE COOKIE ==");
      lcd.cursor(1, 0).print(theMessage);
      lcd.cursor(2, 0).print("                    ");
      lcd.cursor(3, 0).print("====================");

      // Envio de datos a la web
      if (wsMode) {
        if (debugMode) {
        console.log("WebSOcket Request -> emit.");
        };
        listener.sockets.emit('message', theMessage);
      };

      //Mensaje menor o igual a 40 caracteres (2 lineas del LCD)
    } else if(theMessage.length <= 40) {

      // dividimos el mensaje en un array de 2 cadenas. (20 caracteres + x caracteres)
      var res = splitString(theMessage, 20);
      
      // Impresión para el LCD
      lcd.cursor(0, 0).print("== FORTUNE COOKIE ==");
      lcd.cursor(1, 0).print(res[0]);
      lcd.cursor(2, 0).print(res[1]);
      lcd.cursor(3, 0).print("====================");
      
      // Envio de datos a la web
      if (wsMode) {
        if (debugMode) {
        console.log("WebSOcket Request -> emit.");
        };
        listener.sockets.emit('message', theMessage);
      };

      //Mensaje menor o igual a 60 caracteres (3 lineas del LCD)
    } else if(theMessage.length <= 60) {
      
      // dividimos el mensaje en un array de 3 cadenas. (20 + 20 + x caracteres)
      var res = splitString(theMessage, 20);
      // Impresión para el LCD
      lcd.cursor(0, 0).print("== FORTUNE COOKIE ==");
      lcd.cursor(1, 0).print(res[0]);
      lcd.cursor(2, 0).print(res[1]);
      lcd.cursor(3, 0).print(res[2]);
      // Envio de datos a la web
      if (wsMode) {
        if (debugMode) {
        console.log("WebSOcket Request -> emit.");
        };
        listener.sockets.emit('message', theMessage);
      };

      //Mensaje menor o igual a 80 caracteres (4 lineas del LCD)    
    } else if(theMessage.length <= 80) {
      // dividimos el mensaje en un array de 4 cadenas. (20 + 20 + 20 + x caracteres)      
      var res = splitString(theMessage, 20);
      // Impresión para el LCD      
      lcd.cursor(0, 0).print(res[0]);
      lcd.cursor(1, 0).print(res[1]);
      lcd.cursor(2, 0).print(res[2]);
      lcd.cursor(3, 0).print(res[3]);
      // Envio de datos a la web
      if (wsMode) {
        if (debugMode) {
        console.log("WebSOcket Request -> emit.");
        };
        listener.sockets.emit('message', theMessage);
      };

      //Mensaje mayor a 80 caracteres (4 lineas del LCD)    
    } else {
      // el LCD imprime un error
      lcd.cursor(0, 0).print("== FORTUNE COOKIE ==");
      lcd.cursor(1, 0).print("ERROR IN MESSAGE");
      lcd.cursor(2, 0).print("TEXT VERY LONG");
      lcd.cursor(3, 0).print("====================");
      // la consola confirma el error
      console.log("Error in message");
      console.log("Message very long");
      // Envio de datos integros a la web. No presenta un problema
      if (wsMode) {
        if (debugMode) {
        console.log("WebSOcket Request -> emit.");
        };
        listener.sockets.emit('message', theMessage);
      };

    };

};

});