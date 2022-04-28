import prisma from 'lib/prisma'

export default async function handle(req, res) {
  const { search } = req.query
  if(search){
    const searchCourses = await prisma.Curso.findMany({
      distinct: ['id'],
      select: {
        id: true,
        title: true,
        name: true,
        ruta:true,
        category: {
          select: {
            name: true
          }
        }  
      },
      where: {
        active: true,
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
              name:{
                contains: search
              }
            },
          },
        ]
      },
      orderBy: {
        title: 'asc',
      }
    })
    let finalrpta = searchCourses ? searchCourses : null
    res.json(finalrpta)
  }else{
    res.end()
  }
}
