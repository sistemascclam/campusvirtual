import prisma from 'lib/prisma'
import { getSession } from 'next-auth/react';

export default async function handle(req, res) {
    //const session = await getSession({req})
    const  {data}  = req.query
    var datos = data.split('-.-')
 
    const result = await prisma.qualification.create({
        data: {
            idProgres : datos[3],
            description : datos[1],
            star : parseInt(datos[0]),
        },
    }) 
 
    res.status(200).json('datos actualizados')
}   