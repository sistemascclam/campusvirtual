import React from 'react'
import prisma from 'lib/prisma'

export default async function handle(req, res){
    const  {data}  = req.query
    var arrayData = []
    var resultado = []
    var sumaTotal = 0
    var datax = JSON.parse(data)
    for (let index = 0; index < datax.length; index++) {
        if(datax[index].active == true){
            let auxD = []
            auxD = await prisma.curso.findMany({
                where: {
                    id : datax[index].idCurso,
                    active: true,
                }, 
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
            }) 
            resultado.push({
                id: datax[index].idCurso,
                active: true,
                curso: auxD
            })
            sumaTotal = sumaTotal + auxD[0].price
        }
    }
    arrayData.push({
        resultado: resultado,
        suma : sumaTotal
    })
    res.json(arrayData)

}




