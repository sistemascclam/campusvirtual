import prisma from 'lib/prisma'
import { getSession } from 'next-auth/react';

export default async function handle(req, res) {
    const session = await getSession({req})

    var auxId ='0'
    if(session?.user != null){
      auxId = session.user.id
    }
    var resultado = []
    resultado = await prisma.progress.findMany({
      where: {
        idUsuario: auxId,
        active: true,
      }, 
      select: {
        id: true,
        advance: true,
        active: true,
        curso: {
          select : {
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
          }
        },
        qualification:{
          select : {
            id: true,
            description: true,
            star: true,
          }
        }
      } ,
      orderBy: {
        advance: 'asc',
      },

    }) 

    res.json(resultado)
    
}







 