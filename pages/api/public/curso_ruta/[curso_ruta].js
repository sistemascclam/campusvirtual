import prisma from 'lib/prisma'

export default async function handle(req, res) {
    const  {curso_ruta}  = req.query
    //const curso = await prisma.curso.findUnique({
    const curso = await prisma.curso.findUnique({
    where: {
      ruta: curso_ruta,
    }, 
    select: {
      id: true,
      title: true,
      description: true,
      name: true,
      valuation: true,
      image: true,
      price: true,
      registration_date: true,
      ruta: true,
      texto: true,
    } 
  })
  res.json(curso)
}