import prisma from 'lib/prisma'

export default async function handle(req, res) {
  const categories = await prisma.category.findMany({
    where: {
      active: true,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
    }
  })
  res.json(categories)
}
