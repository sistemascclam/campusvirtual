import prisma from 'lib/prisma'
import { getSession } from 'next-auth/react';

export default async function handle(req, res) {
    const session = await getSession({ req })
    var auxId = null
    if (session?.user != null) {
        auxId = session.user.id
    }
    const { keyword, identificador } = req.query

    if (auxId) {
        const curso = await prisma.curso.findFirst({
            where: {
                active: true,
                ruta: keyword,
            },
            select: {
                id: true,
                title: true,
                name: true,
                lecciones: {
                    select: {
                        id: true,
                        orden: true
                    }
                }
            }
        })

        const progress = await prisma.progress.findFirst({
            where: {
                active: true,
                idUsuario: auxId,
                idCurso: curso.id
            },
            select: {
                id: true,
                advance: true,
                leccion: {
                    select: {
                        id: true,
                        orden: true
                    }
                },
            }
        })

        const lastLeccion = await prisma.leccion.findFirst({
            where: {
                idCurso: curso.id,
                id: {
                    not: (progress?.leccion?.id ?? "null")
                },
                orden: {
                    gt: (progress?.leccion?.orden ?? 0)
                }
            },
            include: {
                helpers: true,
            },
            orderBy: {
                orden: 'asc'
            }
        })

        //Si se especifica un id de lección, solo devolver si es menor a la actual
        if (identificador != undefined && identificador != "undefined") {
            if (progress?.advance == 100) {
                const exactLection = await prisma.leccion.findFirst({
                    where: {
                        idCurso: curso.id,
                        id: identificador
                    },
                    include: {
                        helpers: true,
                    }
                })
                res.json({ progress, curso, leccion: exactLection ?? lastLeccion })
            } else {
                const newlastLeccion = await prisma.leccion.findFirst({
                    where: {
                        idCurso: curso.id,
                        id: identificador,
                        orden: {
                            lt: lastLeccion?.orden
                        }
                    },
                    include: {
                        helpers: true,
                    }
                })
                res.json({ progress, curso, leccion: newlastLeccion ?? lastLeccion })
            }
        } else {
            res.json({ progress, curso, leccion: lastLeccion })
        }
        //Si se especifica un id de lección, solo devolver si es menor a la actual
    } else {
        res.status(401).json("Unauthorized")
    }

}