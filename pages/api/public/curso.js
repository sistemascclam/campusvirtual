import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

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
    } 
  })
  res.json(curso)
}
