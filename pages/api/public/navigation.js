import prisma from 'lib/prisma'

export default async function handle(req, res) {
  const categories = await prisma.category.findMany({
    where: {
      active: true,
    },
    select: {
      id: true,
      name: true,
      description: true,
      sections: {
        select: {
          id: true,
          name: true,
          keyword: true,
          description: true
        },
        where: {
          active: true,
        },
      },
    }
  })
  res.json(categories)
}
