import React from 'react'
import prisma from 'lib/prisma'

export default async function handle(req, res) {
    const  {data}  = req.query
    //var resultado1 = []
    var resultado = []
    const searchCourses = await prisma.favorites.findMany({
        distinct: ['id'],
        select: {
            id: true,
            active: true,
            curso: {
                select : {
                    id: true,
                    title: true,
                    description: true,
                    name: true,
                    valuation: true,
                    image: true,
                    price: true,
                    registration_date: true,
                    ruta: true,
                    texto: true,
                }
            },
        },
        where: {
          active: true,
          OR: [
            {
                curso: {
                    title:{
                        contains: data
                    }
                },
            },
            {
                curso: {
                    name:{
                        contains: data
                    }
                },
            }, 
          ]
        },
    })
    resultado.push({
        action: 'BD',
        arrayC: searchCourses,
    })
    
    
    res.json(resultado)

}
