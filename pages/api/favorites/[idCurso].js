import prisma from 'lib/prisma'
import { getSession } from 'next-auth/react';

export default async function handle(req, res) {
    const { idCurso, action } = req.query
    const session = await getSession({ req })
    var auxId = null
    if (session?.user != null) {
        auxId = session.user.id
    }

    if (req.method == "POST") {
        if (auxId) {
            if (action == "add") {
                const addCurso = await prisma.favorites.create({
                    data: {
                        'idUsuario': auxId,
                        'idCurso': parseInt(idCurso),
                    },
                })
            }
            if (action == "remove") {
                const deleteCurso = await prisma.favorites.deleteMany({
                    where: {
                        'idUsuario': auxId,
                        'idCurso': parseInt(idCurso),
                    },
                })
            }
        }
    }

    res.status(200).json(idCurso)
}   