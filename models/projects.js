/*
Ak crear modelos, desde aqui estariamos creando modelos en la base de datos
*/
'use strict'

const mongoose = require('mongoose');//Importamos mongoose ya que este se encarga de trabajar con los modelos
const Schema = mongoose.Schema;//Se carga el objeto de esquema

//Se crea el nuevo molde, para crear nuevos proyectos en nuestra base de datos
//Sobre este molde, se estara creando diferentes proyectos.
const ProjectsShema = Schema({
    name: String,
    lasname: String,
    nacimiento: String,
    image: String,
    pagina: String
});

//Se exporta el modulo para poder importalo en otras unidades
module.exports = mongoose.model('Project', ProjectsShema);
//Al ejecutar save, se guardara el documento projects, ya que mongoose
//se encarga de pluralizar el nombre.  
// projects --> guarda los documents en la coleccion
