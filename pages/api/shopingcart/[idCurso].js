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
            let message='Registro exitoso'
            if (action == "add") {
                const addCurso = await prisma.ShopingCart.create({
                    data: {
                        'idUsuario': auxId,
                        'idCurso': parseInt(idCurso),
                    },
                })
                message = 'Agregado a carrito'
            }
            if (action == "remove") {
                const deleteCurso = await prisma.ShopingCart.deleteMany({
                    where: {
                        'idUsuario': auxId,
                        'idCurso': parseInt(idCurso),
                    },
                })
                message = 'Eliminado de carrito'
            }
            res.json({message:message,idCurso})
        } else {
            res.status(401).json("Unauthorized")
        }
    }

}   