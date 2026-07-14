import 'dotenv/config'
import express from 'express'
import db from './config/db.js'

import router from './routes/index.js'

const app = express()

//Conectar la base de datos
db.authenticate()
  .then(() => console.log('Base de datos conectada'))
  .catch((error) => console.log(error))

//Puerto
const port = process.env.PORT || 4000

//Habilitar PUG
app.set('view engine', 'pug')

//Obtener año actual
app.use((req, res, next) => {
  const year = new Date()
  res.locals.currentYear = year.getFullYear()
  res.locals.nombreSitio= 'Agencia de Viajes'
  return next()
})

//Agregar body parser para leer datos del formulario
app.use(express.urlencoded({extended: true}))

//Definir la carpeta public
app.use(express.static('public'))

//Agregar Router
app.use('/', router)

app.listen(port,() => {
  console.log(`El servidor esta funcionando en el puerto ${port}`)
})