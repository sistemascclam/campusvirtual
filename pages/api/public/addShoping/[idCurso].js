import prisma from 'lib/prisma'
import { getSession } from 'next-auth/react';

export default async function handle(req, res) {
    const session = await getSession({req})
    var auxId ='0'
    if(session?.user != null){
      auxId = session.user.id
    }

    if(auxId !='0'){
        const {idCurso} = req.query 
        let data = await prisma.ShopingCart.findMany({
            where: {
                idUsuario: auxId,
                'idCurso' : parseInt(idCurso) ,
            }, 
            select: {
                id: true,
            } 
        }) 
        if(data.length == 0){
            const result = await prisma.ShopingCart.create({
                data: {
                    'idUsuario' : auxId,
                    'idCurso' : parseInt(idCurso) ,
                },
            })
        }
    }

    res.status(200).json('arrayData')
}   