'use strict'//Se activa el modo estricto y ademas las nuevas caracteristicas de javascript

var express = require('express');//Se carga el modulo de express.
var ProjecController = require('../controllers/project');//Importamos archv

var router = express.Router();//Se carga el servicio router - Contiene varios metodos

//Middleware
var multipart = require('connect-multiparty');//Cargamos el modulo
var multipartMiddleware = multipart({uploadDir:'./uploads'});//Le indicamos en donde se guardaran las imagenes o archivos que se han cargado.

//Creamos las rutas que se agregaran al servicio
router.get('/home', ProjecController.home);//Creamos ruta
router.get('/test', ProjecController.test);//Creamos ruta
router.post('/save-project', ProjecController.SaveProject);//Se crea la ruta y se indica el metodo que se va a ejecutar.
router.get('/get-project/:id?', ProjecController.GetProject);//Se pondra un id obligatorio u opcional indicando con "?"
router.get('/obtener-projectos', ProjecController.GetTodosProjectos);
router.put('/actualizar-projecto/:id', ProjecController.updateProject);//Se usa metodo put ya que se actualizaran
router.delete('/actualizar-projecto/:id', ProjecController.deleteProject); 
//La subida del archivo se guarda antes, con el middware
router.post('/uploadImage/:id', multipartMiddleware, ProjecController.uploadImage);//En segundo parametro se manda el middware ya que debe de ejecutarse antes de la accion de la ruta.
router.get('/get-image/:image', ProjecController.getImageFile);

module.exports = router;//Exportamos el modulo, estando listas las rutas se deben de cargar en app