import prisma from 'lib/prisma'
import { getSession } from 'next-auth/react';

export default async function handle(req, res) {
    const session = await getSession({req})
    var auxId ='0'
    if(session?.user != null){
      auxId = session.user.id
    }
    const  {idCurso}  = req.query

    const cursoCart = await prisma.shopingCart.findMany({
      where: {
        idUsuario: auxId,
        idCurso: parseInt(idCurso)
      }, 
      select: {
        id: true,
        active : true,
      } 
    })
    const cursoFav = await prisma.favorites.findMany({
      where: {
        idUsuario: auxId,
        idCurso: parseInt(idCurso)
      }, 
      select: {
        id: true,
        active : true,
      } 
    })
    var array = []
    array.push({'cursoCart':cursoCart})
    array.push({'cursoFav':cursoFav})
  res.status(200).json(array)

  //res.json(cursoCart)
}