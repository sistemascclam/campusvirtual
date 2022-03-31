import prisma from 'lib/prisma'

export default async function handle(req, res) {
    const  {datos}  = req.query
    var arrayData = datos.split('-')

    const favorites = await prisma.favorites.findUnique({
    where: {
        idUsuario: arrayData[0],
        idCurso: arrayData[1],
    }, 
    select: {
      id: true,
      idUsuario: true,
      idCurso: true,
      registration_date: true,
      active: true,
    } 
  })
  res.json(favorites)
}