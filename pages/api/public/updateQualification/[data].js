import prisma from 'lib/prisma'
import { getSession } from 'next-auth/react';

export default async function handle(req, res) {
    //const session = await getSession({req})
    const  {data}  = req.query
    var datos = data.split('-.-')

    var resultado = await prisma.qualification.update({
        where:{
            id : parseInt(datos[2]),
        },
        data: {
            star: parseInt(datos[0]),
            description: datos[1],
        },
    })

    res.status(200).json('datos actualizados')
}   