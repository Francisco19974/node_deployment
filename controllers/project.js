'use stric'//Se activa el uso estricto

//Exiten varias maneras de hacer el codigo, se puede hacer mediando un objeto json
//o bien se podria crear funciones separadas y asi devolver un objeto json

//Cargamos el Modelo
var Project = require('../models/projects');
var fs = require('fs');//Se carga la libreria que permitira borrar el archivo, imagen cargado en la carpeta de uploads
var path = require('path');

//Devolvemos un json, se hace una especie de clase
var controlador = {
    home: function(req, res){//Se recibe el metodo, y se manda la respuesta.
        return res.status(200).send({
            message: "Soy el home"
        });
    },

    test: function(req, res){
        return res.status(200).send({
            message: "Soy el test"
        });
    },

    SaveProject: function(req, res){
        var project = new Project();//Al crear nuevo proyecto, se crea un nuevo id
        var params = req.body;//Se obtienen los parametros que se enviaron en el body
        project.name = params.name;
        project.lasname = params.lasname;
        project.nacimiento = params.nacimiento;
        project.image= null;
        project.pagina = params.pagina;

        //Guardamos el proyecto
        project.save((Error, ProjectSave) => {
            if (Error) { return res.status(500).send("Error al guardar el projecto") };//Error
            if (!ProjectSave) { return res.status(404).send("No se ha podido guardar el documento") };//No se encontro documento
            return res.status(200).send({project:ProjectSave});//Indicamos que todo salio bien
        });

        // return res.status(200).send({
        //     project: project,
        //     message: 'Metodo se ha ejecutado correctamente'
        // });
    },

    GetProject: function(req, res){
        var Projectid = req.params.id;

        if (Projectid === null) return res.status(404).send({message: "Error"}); 

        Project.findById(Projectid, (err, project) => {
            if (err) return res.status(500).send({message: "Error al devolver el registro"});
            if (!project) return res.status(404).send({message: "Error el proyecto no existe"});

            return res.status(200).send({
                project: project
            });
        });
    },

    GetTodosProjectos: function(req, res){
        //find({name: 'Juan'}) Le indicamos que debe de filtrar los registros en donde el nombre sea igual a Juan.
        //.sort('name') para poder ordenar poder año
        //.sort('+name') ordena de mayor a menor
        //.sort('-name') ordena de menor a mayor
        Project.find({}).sort('name').exec((error, projectos)=>{
            if (error) return res.status(500).send({message: "Error al ejecutar el procedimiento"});
            if (!projectos) return res.status(404).send({message: "No se encontraron proyectos"});

            return res.status(200).send({projects: projectos});
        });
    },

    updateProject: function(req, res){//Recibe una request y una res
        //En la documentacion de Mongoose, estan los metodos que se utilizan para afectar los datos
        var projectid = req.params.id;//Se obtiene la clave id, pasada como parametro en la url
        var update = req.body;//Se obtiene los valores que estan el body de la peticion que se realizara desde el cliente resfull

        //Se le envian 3 parametros, el primero le indicamos que projeecto es el que va actualizar
        //Segundo el projecto que actualizara los valores del projecto que corresponda al id enviado
        //Tercero se le indica que nos devuelva el registro actualizado, si no se manda se mostrara el registro que va actualizar sin cambios. {new:true}
        //Cuarto funcion de callback
        Project.findByIdAndUpdate(projectid, update, {new: true},(error, projectupdate)=>{
            if (error) { return res.status(505).send({message: 'Error al intentar actualizar un proyecto'}) };
            if (!projectupdate) { return res.status(404).send({message: 'El projecto indicado no existe'}) };
            return res.status(200).send({project:projectupdate, message: 'Actualizado correctamente'});
        }); 
    },

    deleteProject: function(req, res){
        //En la documentacion de Mongoose, estan los metodos que se utilizan para afectar los datos
        var projectid = req.params.id;//Se obtiene la clave id, pasada como parametro en la url

        Project.findByIdAndRemove(projectid, (error, projectRemove)=>{
            if (error) { return res.status(505).send({message: 'Error al intentar borrar el proyecto'}) };
            if (!projectRemove) { return res.status(404).send({message: 'El projecto no se pudo borrar'}) };
            return res.status(200).send({project:projectRemove});
        }); 
    },

    uploadImage: function(req, res){
        //Se utilizara el modulo descargado, al principio connect-multiparty
        var projectid = req.params.id;
        var fileName = 'Imagen no subida';

        if (req.files){//Si existe el objeto/ Node no es capaz de trabajar con "files" directamente enviado desde postman, se debe de utilizar o cofigurar multiparty
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];//Se obtiene el nombre de la imagen
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];

            if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif' || fileExt == 'JPG'){
                Project.findByIdAndUpdate(projectid, {image: fileName}, {new: true}, (err, projectupdate) => {
                    if (err) return res.status(500).send({message: 'Ha ocurrido un error al intentar cargar imagen'});
                    
                    if (!projectupdate) return res.status(400).send({message: 'Projecto no encontrado e imagen no cargada'});
    
                    return res.status(200).send({
                        project: projectupdate,
                        files: fileName
                    });
                });
            } else {
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({message: 'La estension no es valida'});
                });
            }
        } else {
            return res.status(200).send({
                message: fileName
            })
        }
    },

    getImageFile: function(req, res){
        var file = req.params.image;
        var path_file = './uploads/'+file;

        fs.access(path_file, fs.constants.F_OK,(err) => {
            if (!err) {
                return res.sendFile(path.resolve(path_file));      
            } else {
                return res.status(200).send({ message: 'No existe la imágen...'})                 
            }
        })
    }
};

module.exports = controlador;//Se exporta el controlador para poder utilizarlo, fuera de este archivo