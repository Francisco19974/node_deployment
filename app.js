//Ctrl + U: Para ver la estructura HTML
'use strict'

const express = require('express');//Lo que hace es irse a la carpeta de "node_modules" y cargar el modulo.
const bodyParser = require('body-parser');

const app = express();

// Cargar archivos de rutas
var project_routes = require('./routes/project');//Cargamos el modulo

//Middlewares: 
//Es una capa que se ejecuta antes, o un metodo que se ejecuta antes de ejecutar la accion de un controlador
// de ejecutar el resultado de la peticion, se ejecuta el middleware y despues la funcionalidad principal de ruta a la cual estemos llamando.
app.use(bodyParser.urlencoded({extended: false}));
//Para convertir lo que llegue, cualquier dato por post u otro, convertirlo a un objeto json
//extended es un comfiguracion necesaria para bodyparse
app.use(bodyParser.json());//Le indicamos que todo lo que le llegue, lo convierta a json

//CORS: Al intentar hacer peticiones es normal que fallen las conexiones por ende se agrega middleware para poder realizar peticiones correctamente.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// //Rutas-Ahora se utilizan en el project.js - controlador
// app.get('/', (req, res) => {
//     res.status(200).send(
//         '<h1>Pagina de inicio</h1>'
//     );//Al retornar 200, el servidor indicara que se ha ejecutado correctamente la peticion
// });

// app.post('/test/:id', (req, res) => {
//     console.log(req.body.name);//Se obtienen los valores de parametro name - se imprimen los datos.
//     //Los resultados se muestran en consola.
//     console.log(req.query.web);//Recupera el valor del parametro "web" definodo en la url
//     console.log(req.params.id);//Se le indica a la url, que debe de enviar un parametro con valor id
//     res.status(200).send({
//         message: "Hola mundo desde mi API de NodeJS"
//     })//Al retornar 200, el servidor indicara que se ha ejecutado correctamente la peticion
// });

//Importamos las rutas
app.use('/api', project_routes);//Le indicamos que si la ruta va a tener una cadena adicional entonces le ingresamos '/api' y despues la mandamos el objeto de las rutas.

//Exportar
module.exports = app;//Que ya tiene configurado lo de middlewares