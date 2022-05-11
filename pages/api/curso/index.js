import prisma from 'lib/prisma'
import { getSession } from 'next-auth/react';

export default async function handle(req, res) {
  const session = await getSession({req})
  var auxId ='0'
  if(session?.user != null){
    auxId = session.user.id
  }
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
    } 
  })
  res.json(curso)
}
