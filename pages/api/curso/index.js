import prisma from 'lib/prisma'

export default async function handle(req, res) {
  const curso = await prisma.curso.findMany({
    where: {
      active: true,
    }, 
    select: {
      id: true,
      title: true,
      description: true,
      name: true,
      valuation: true,
      image: true,
      price: true,
      priceWODiscount: true,
      registration_date: true,
      ruta: true,
      texto: true,
    } 
  })
  res.json(curso)
}
