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
        const progressres = await prisma.progress.count({
            where: {
              idUsuario: auxId,
              idCurso: parseInt(idCurso),
            }
          })
        
        if(progressres == 0){
            const result = await prisma.progress.create({
                data: {
                    'idUsuario' : auxId,
                    'idCurso' : parseInt(idCurso) ,
                },
            })
            res.status(200).json('Agregado')
        }else{
            res.status(200).json('Ya en progreso')
        }
    }else{
        res.status(401).json("Unauthorized")
    }

}   