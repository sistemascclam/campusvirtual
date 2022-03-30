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
        const result = await prisma.favorites.create({
            data: {
                'idUsuario' : auxId,
                'idCurso' : parseInt(idCurso) ,
            },
        })
    }

    res.status(200).json('arrayData')
}   