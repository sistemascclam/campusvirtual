import prisma from 'lib/prisma'
import { getSession } from 'next-auth/react';

export default async function handle(req, res) {
    const session = await getSession({ req })
    var auxId = null
    if (session?.user != null) {
        auxId = session.user.id
    }
    const { progressId, newlection } = req.body
    // const { progressId, newlection } = req.query

    if (auxId && newlection) {
        const currentProgress = await prisma.progress.findFirst({
            where: {
                id: progressId,
                active: true
            },
            select: {
                id: false,
                advance:true,
                curso: {
                    select: {
                        lecciones:
                        {
                            select: {
                                id: true,
                                orden: true
                            }
                        }
                    }
                },
                leccion: {
                    select: {
                        id: true,
                        orden: true
                    }
                }
            }
        })

        if(currentProgress?.advance == 100){
            res.status(202).json("Curso terminado")
        }else{
            let lecciones = currentProgress?.curso?.lecciones,
                maxOrdenleccion = Math.max(...lecciones?.map(l => l.orden)) ?? 1,
                newOrden = (currentProgress?.leccion?.orden ?? 0) + 1,
                newLect = lecciones?.find(l => l.id == newlection),
                dataupdate = {}
    
            if (maxOrdenleccion == newOrden) {
                //FINALIZAR LECCION
                dataupdate = {advance: 100,lastLeccion: null}
            } else {
                //Si es la leccion nueva que se solicita
                if (newOrden == newLect?.orden) {
                    dataupdate = {advance: parseInt(100*newOrden/maxOrdenleccion),lastLeccion: newLect?.id}
                }
            }
            
            if(Object.keys(dataupdate)?.length==0){
                if(newLect?.orden<newOrden){
                    res.status(202).json("Leccion pasada")
                }else{
                    res.status(402).json("Leccion incorrecta")
                }
            }else{
                const progressupdated = await prisma.progress.update({
                    where: {
                        id: progressId
                    },
                    data: dataupdate
                })
                res.status(202).json("Actualizada")
            }
        }

    } else {
        res.status(401).json("Unauthorized")
    }

}