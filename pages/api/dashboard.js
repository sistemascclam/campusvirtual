import prisma from 'lib/prisma'
import { getSession } from 'next-auth/react';

export default async function handle(req, res) {
    const session = await getSession({ req })
    var auxId = null
    if (session?.user != null) {
        auxId = session.user.id
    }

    if (auxId) {
        const userInfo = await prisma.User.findUnique({
          where: {
            id: auxId,
          },
          select:{
            progresos: {
                select:{
                    id:true,
                    advance:true,
                    lastLeccion:true,
                    curso:{
                        select:{
                            lecciones:{
                                select:{
                                    id:true,
                                    orden:true,
                                    duracion:true
                                }
                            }
                        }
                    }
                }
            }
          }
        })
        let 
        inscritos = userInfo?.progresos.length,
        completados = userInfo?.progresos.filter(p=>p.advance==100).length,
        minutosCursosCompletados = userInfo?.progresos?.filter(p=>p.advance==100).map(p=>p.curso.lecciones.reduce((a,b)=>{return a+b.duracion},0)).reduce((a,b)=>{return a+b},0),
        minutosCursosNoCompletados = userInfo?.progresos?.filter(p=>p.advance!=100 && p.advance!=0).map(p=>p.curso.lecciones.filter(l=>l.orden <= (p.curso.lecciones.find(ll=>ll.id==p.lastLeccion)?.orden)).reduce((a,b)=>{return a+b.duracion},0)).reduce((a,b)=>{return a+b},0),
        minCompletados = (minutosCursosCompletados ?? 0) + (minutosCursosNoCompletados ?? 0)
        res.json({inscritos,completados,minCompletados})
    } else {
        res.status(401).json("Unauthorized")
    }
}