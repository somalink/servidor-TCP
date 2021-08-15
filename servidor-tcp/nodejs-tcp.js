/*
En el tutorial de introducción de node.js (http://nodejs.org/), muestran un tcp básico
servidor, pero por alguna razón omite un cliente que se conecta a él. Agregué un
ejemplo en la parte inferior.

Guarde el siguiente servidor en example.js:
*/

var net = require('net');

var server = net.createServer(function(socket) {
	socket.write('Echo server\r\n');
	socket.pipe(socket);
});

server.listen(1337, '127.0.0.1');

/*
Y conéctese con un cliente tcp desde la línea de comandos usando netcat, 
la utilidad * nix para leer y escribir a través de conexiones de red tcp / udp. 
Solo lo he usado para depurar.

$ netcat 127.0.0.1 1337

Deberias de ver:
> Echo server

*/

/* O usa este cliente tcp de ejemplo escrito en node.js. (Originado con
código de ejemplo de 
http://www.hacksparrow.com/tcp-socket-programming-in-node-js.html.) */

var net = require('net');

var client = new net.Socket();
client.connect(1337, '127.0.0.1', function() {
	console.log('Connected');
	client.write('Hello, server! Love, Client.');
});

client.on('data', function(data) {
	console.log('Received: ' + data);
	client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
});
