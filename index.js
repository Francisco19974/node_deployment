'use strict'
const mongoose = require('mongoose');//Funcion de nodeJS-Cargamos el modulo de moongose
const app = require('./app');//Se pone la ruta donde se encuentra el archivo app

require('dotenv').config({ path: 'variables.env'});

//CONECTAR BASE DE DATOS.
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL)
        .then(() =>{
            console.log("Conexion a la base de datos establecida en el puerto");

            // Leer localhost dee variables y puertos
            const host = process.env.HOST || '0.0.0.0';
            const port = process.env.PORT || 3000; 
            //Creacion del servidor, se manda a llamar app, que es donde esta express
            app.listen(port, host, () => {
                console.log("Servidor corriendo correctamente en la url: localhost: 3000");
            }, )
        })
        .catch(err => console.log(err));