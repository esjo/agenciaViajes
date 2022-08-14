import express from 'express';
import router from './routes/index.js'
import db from './config/db.js';

const app = express();

//Conectar la base de datos
db.authenticate()
    .then(() => console.log('base de datos conectada'))
    .catch(error => console.log(error))

//definir puerto 
const port = process.env.PORT || 4000;


//Habilitar PUG
app.set('view engine', 'pug');


//Obtener el año actual
app.use((req,res,next) =>{
    const year = new Date();
    res.locals.fullYear = year.getFullYear();
    res.locals.nombresitio = 'Agencia de viajes';
   next();
});

//Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended:true}));


//Definir carpeta public
app.use(express.static('public'))

//Agregar el router
app.use('/',router);

app.listen(port,() =>{
    console.log('El servidor esta funcionando en el puerto',port);
})