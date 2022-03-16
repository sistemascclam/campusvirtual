import prisma from 'lib/prisma'

export default async function handle(req, res) {
    const  {curso_id}  = req.query
    const curso = await prisma.curso.findUnique({
    where: {
      id: parseInt(curso_id),
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
  //res.json(curso)
  res.json(curso)

  //res.end(req.query)
}