import prisma from 'lib/prisma'

export default async function handle(req, res) {
  const { search, slug, perPage = 6, page = 1, gratis, descuento, desde, hasta, estrellas } = req.query

  /*FILTROS*/
  let where = {
    active: true,
  },
    whereminmax = {
      active: true,
    },
    resp = {};

  if (slug) {
    const category = await prisma.category.findUnique({
      where: {
        slug: slug
      },
      include: {
        cursos: true,
      }
    })
    resp = {
      ...resp,
      category
    }
    where = {
      ...where,
      categoryId: category?.id,
    }
  }
  if (search) {
    where = {
      ...where,
      OR: [
        {
          title: {
            contains: search
          },
        },
        {
          name: {
            contains: search
          },
        },
        {
          category: {
            name: {
              contains: search
            }
          },
        },
      ]
    }
  }
  if (descuento) {
    where = {
      ...where,
      priceWODiscount: {
        gt: 0
      }
    }
  }
  if (gratis) {
    where = {
      ...where,
      "OR": [
        {
          price: 0
        },
        {
          price: null
        }
      ]
    }
    whereminmax = where
  } else {
    whereminmax = where
    if (desde) {
      where = {
        ...where,
        price: {
          gte: parseInt(desde)
        }
      }
    }
    if (hasta) {
      where = {
        ...where,
        price: {
          lte: parseInt(hasta)
        }
      }
    }
  }
  if (!isNaN(estrellas)) {
    where = {
      ...where,
      valuation: parseInt(estrellas)
    }
    whereminmax = {
      ...where,
      valuation: parseInt(estrellas)
    }
  }
  /*FILTROS*/

  const cursos = await prisma.Curso.findMany({
    where: where,
    select: {
      id: true,
      title: true,
      name: true,
      valuation:true,
      image:true,
      price:true,
      ruta:true,
      priceWODiscount:true,
      category: {
        select: {
          name: true
        }
      }  
    },
    take: parseInt(perPage),
    skip: (parseInt(page) - 1) * parseInt(perPage)
  })

  const totals = await prisma.Curso.aggregate({
    where: where,
    _count: {
      id: true,
    },
  })

  const minmax = await prisma.Curso.aggregate({
    where: whereminmax,
    _min: {
      price: true,
    },
    _max: {
      price: true,
    },
  })
  delete where.valuation
  const stars = await prisma.Curso.findMany({
    where: where,
    select: {
      valuation: true,
    },
    distinct: ['valuation'],
    orderBy: {
      valuation: 'asc',
    },
  })

  let
    totalFinal = {
      cursos: totals._count.id,
      minPrice: Math.ceil(minmax._min.price),
      maxPrice: Math.ceil(minmax._max.price),
      stars: stars.map(s => s.valuation),
    }
  resp = {
    ...resp,
    cursos, totals: totalFinal
  }

  res.json(resp)
}