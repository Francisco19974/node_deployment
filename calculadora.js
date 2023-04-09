'use strict'
//process.argv.slice(1);//Muestra valores junto con url del archivo donde se obtienen los parametros.
//process.argv.slice(2);//Devuelve el valor de los parametros enviados desde consola

var param = process.argv.slice(2);//Obtiene los parametros enviados desde nodejs
var Num1 = parseFloat(param[0]);
var Num2 = parseFloat(param[1]);

var Numeros = `
La suma es: ${Num1 + Num2}
La resta es: ${Num1 - Num2}
La multiplicacion es: ${Num1 * Num2}
`;

console.log(Numeros);
console.log("Hola mundo desde NodeJS");