import prisma from 'lib/prisma'
import { getSession } from 'next-auth/react';

export default async function handle(req, res) {
    const session = await getSession({req})
    var auxId ='0'
    if(session?.user != null){
      auxId = session.user.id
    }
    const  {keyword}  = req.query
    
    const curso = await prisma.curso.findUnique({
      where: {
        ruta: keyword,
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
        progress: {
          where : {
            idUsuario : auxId,
          },
          select : {
            active: true
          }
        },
        favorites: {
          where : {
            idUsuario : auxId,
          },
          select : {
            id: true,
            active: true
          }
        },
        shopingCarts: {
          where : {
            idUsuario : auxId,
          },
          select : {
            id: true,
            active: true
          }
        },
        calificaciones: {
          take: 10,
          where: {
            active: true,
          },
          select: {
            user: {
              select: {
                name: true,
                email: true,
                image: true
              }
            },
            description: true,
            star: true,
            registration_date: true,
          }
        }

      } 
    })

  res.json(curso)
}