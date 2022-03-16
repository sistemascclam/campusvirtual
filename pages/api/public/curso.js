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
      registration_date: true,
    } 
  })
  res.json(curso)
}
