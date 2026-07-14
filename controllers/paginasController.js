import {Viaje} from '../models/Viaje.js'
import {Testimonio} from '../models/Testimonio.js'

const paginaInicio = async (req,res) => {

  try {
    const resultado = await Promise.all([Viaje.findAll({limit: 3}), Testimonio.findAll({limit: 3})])

    res.render('Inicio', {
      pagina: 'Inicio',
      clase: "home",
      viajes: resultado[0],
      testimonios: resultado[1]
    })
  } catch (error) {
    console.log(`Error: ${error}`)
  } 
}

const paginaNosotros = (req,res) => {
  res.render('nosotros', {
    pagina: 'Nosotros'
  })
}

const paginaViajes = async (req,res) => {

  try{
    //Consultar BD
    const viajes = await Viaje.findAll()

    return res.render('viajes', {
      pagina: 'Proximos Viajes',
      viajes
    })
  }catch(error){
    console.log(`Error: ${error}`)
  }

}

//Muestra un viaje por el slug
const paginaDetalleViaje = async (req, res) => {
  const { slug } = req.params

  try {
    const resultado = await Viaje.findOne({
      where: {
        slug
      }
    })

    return res.render('viaje', {
      pagina: 'Informacion Viaje',
      resultado
    })
  } catch (error) {
    console.log(`Error: ${error}`)
  }

}

const paginaTestimonios = async (req,res) => {

  try {
    const testimonios = await Testimonio.findAll()
    res.render('testimonios', {
      pagina: 'Testimonios',
      testimonios
    })
  } catch (error) {
    console.log(`Error: ${error}`)
  }

  
}

export {
  paginaInicio,
  paginaNosotros,
  paginaViajes,
  paginaDetalleViaje,
  paginaTestimonios
}