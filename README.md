# Fortune Cookie Simulator
Un simulador de las míticas galletas de la fortuna que nos muestra un *mensaje de la fortuna* en el LCD o en el navegador. 
Gracias a WebSockets [WebSockets](https://www.wikiwand.com/es/WebSocket). Por supuesto se puede disparar la apertura de una galleta desde el navegador o desde nuestro propio Arduino.

Este script esta diseñado para ser usado con [eduBasica Shield](http://www.practicasconarduino.com/edubasica/), pero también se peude hacer sin el.. sin necesidad de retocar el código en ningun momento.


## Descripción:

![tablet](https://github.com/UlisesGascon/Fortune-Cookie-Simulator/blob/master/img/tablet_fortune_cookies.png)


Programado en Javascript, se apoya en Nodejs y la librería Johnny-five. Se peude acceder a nuestra aplicación desde cualquier dispositivo que este conectado a nuestra red local (compartiendo el mismo wifi o conexión). Solo es necesario introducir la url (IP + puerto) de nuestro Raspberry Pi en el navegador. Por ejemplo:

	~~~
	192.168.1.66:1000
	~~~


Los resultados y acciones se sincronizan automaticamente entre nuestro navegador y el LCD. Así que no importa desde donde lo accionemos o realicemos la lectura


## Créditos
- Hendrik Lammers por la función [splitString](https://gist.github.com/hendriklammers/5231994).
- Huffington Post por la imagen del *index.html*
- Librería de mensaje creada a partir de la web [Fortune Cookie Message](http://www.fortunecookiemessage.com)

## Configuracion y opciones avanzadas:

El script esta listo para ejecutarse, pero existen opciones addicionales:

- Se puede cambiar el puerto del servidor
	~~~
	var wsPort = 3000; // 3000, 1000, 8080 ... son los más usados.
	~~~

- Cualquier ordenador, tablet o smartphone conectado a la red local podra acceder al script a través del navegador.
	Solo necesitas introducir la IP de tu host o Raspberry Pi y el Purto (wsPort) en el navegador.
	~~~
	192.168.1.66:1000 
	~~~
- Se incluye una función para depurar usando la consola de Nodejs, que se puede habilitar o deshabilitar.
	~~~
	var debugMode = false; // o true
	~~~

- El entorno web (websockets) es opcional y se peude habilitar o deshabilitar con una variable.
	~~~
	var wsMode = true; // o false
	~~~
- Existe un modo Geek que utiliza mensajes un poco más divertidos.
	~~~
	var geekMode = false; // o true
	~~~

- El script utiliza una [libreria](https://github.com/UlisesGascon/Fortune-Cookie-Simulator/blob/master/cookieMessages.js) con más de 350 mensajes predefinidos.

- El script funciona con o sin [eduBasica Shield](http://www.practicasconarduino.com/edubasica/).



## Hardware necesario:

**Con [eduBasica Shield](http://www.practicasconarduino.com/edubasica/)**
![Conexiones](https://github.com/UlisesGascon/Fortune-Cookie-Simulator/blob/master/img/edubasica_mensaje.png)
*Nota: el LCD tiene que tener instalado I2C. En la imagen, no lo es, pero los cables estan conectados como si fuera I2C*

- Placa Arduino UNO o similar**

- [eduBasica Shield](http://www.practicasconarduino.com/edubasica/)

-LCD 20x4 con I2C
*Pantalla LCD*
![Product 198](http://www.adafruit.com/images/970x728/x198-04.jpg.pagespeed.ic.diHsBxj06P.webp)

*I2C Backpack*
![Product i2c](https://learn.adafruit.com/system/assets/assets/000/001/874/medium260/lcds___displays_i2cwire_t.jpeg?1396777095)

Más información sobre [Pantalla LCD en Adafruit](http://www.adafruit.com/products/198)
Más información sobre [I2C Backpack en Adafruit](https://learn.adafruit.com/i2c-spi-lcd-backpack)
Para adaptar este script a otro dispositivo, consulta [Johnny-five API](http://johnny-five.io/api/lcd/)


** Sin [eduBasica Shield](http://www.practicasconarduino.com/edubasica/)**

![Conexiones](https://github.com/UlisesGascon/Fortune-Cookie-Simulator/blob/master/img/protoboard.png)
*Nota: el LCD tiene que tener instalado I2C. En la imagen, no lo es, pero los cables estan conectados como si fuera I2C*

-Placa Arduino UNO o similar**

- Pulsador

- Resistencia de 10k Ohms

-LCD 20x4 con I2C
*Pantalla LCD*
![Product 198](http://www.adafruit.com/images/970x728/x198-04.jpg.pagespeed.ic.diHsBxj06P.webp)

*I2C Backpack*
![Product i2c](https://learn.adafruit.com/system/assets/assets/000/001/874/medium260/lcds___displays_i2cwire_t.jpeg?1396777095)

Más información sobre [Pantalla LCD en Adafruit](http://www.adafruit.com/products/198)
Más información sobre [I2C Backpack en Adafruit](https://learn.adafruit.com/i2c-spi-lcd-backpack)
Para adaptar este script a otro dispositivo, consulta [Johnny-five API](http://johnny-five.io/api/lcd/)


## Pantalla de Bienvenida:
Este script ofrece una pantalla de bienvenida cuando termina de cargarse y confirma que esta listo para empezar a desvelar tu fortuna
![final](https://github.com/UlisesGascon/Fortune-Cookie-Simulator/blob/master/img/edubasica_bienvenida.jpg)



## Instalación:

Es necesario contar con [Nodejs](https://nodejs.org/) y [Npm](https://docs.npmjs.com/getting-started/installing-node) en tu sistema.

Para este script es necesario [instalar WebSockets](https://www.npmjs.com/package/socket.io):

~~~
sudo npm install -g socket.io
~~~


Para este script es necesario instalar Johnny-Five:

~~~
sudo npm install -g johnny-five
~~~


## Ejecutar el Script:

Desde la carpeta donde esta *fortuneCookies.js*

~~~
node fortuneCookies
~~~
