import {Testimonio} from '../models/Testimonio.js'


const guardarTestimonio = async (req, res) => {

  const {nombre, correo, mensaje} = req.body

  const errores = []

  //Validar los valores
  if(nombre.trim() === ''){
    errores.push({mensaje: 'El nombre esta vacio'})
  }

  if(correo.trim() === ''){
    errores.push({mensaje: 'El correo esta vacio'})
  }

  if(mensaje.trim() === ''){
    errores.push({mensaje: 'El mensaje esta vacio'})
  }

  if(errores.length > 0){

    const testimonios = await Testimonio.findAll()

    return res.render('testimonios', {
      pagina: 'Testimonios',
      errores,
      nombre,
      correo,
      mensaje,
      testimonios
    })
  }

  //Almacenar en la base de datos
  try{
    await Testimonio.create({
      nombre,
      correo,
      mensaje
    })

    res.redirect('/testimonios')
  }catch(error){
    console.log(`Error: ${error}`)
  }
}

export {
  guardarTestimonio
}