import prisma from 'lib/prisma'
import { getSession } from 'next-auth/react';

export default async function handle(req, res) {
    const session = await getSession({req})
    let final = []
    if(session?.user != null){
      const favorites = await prisma.favorites.findMany({
        where: {
          idUsuario: session.user.id,
          active:true
        }, 
        select: {
          id: true,
          idCurso: true
        } 
      })

      final = favorites
    }
    res.json(final)
}