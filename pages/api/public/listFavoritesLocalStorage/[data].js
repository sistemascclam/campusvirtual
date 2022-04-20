import React from 'react'
import prisma from 'lib/prisma'

export default async function handle(req, res) {
    const  {data}  = req.query
    var _datax = data.split('--')
    var arrayData = []

    var resultado = []
    var resultado2 = []

    var datax = JSON.parse(_datax[0])
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
            if(_datax[1] == '1'){
                resultado2.push({
                    idCurso: datax[index].idCurso,
                    active: true,
                })
            }
        }
    }
    if(_datax[1] == '1'){
        arrayData.push({
            action: 'localStorage',
            arrayC: JSON.stringify(resultado2),
        })
        res.json(arrayData)
    }else{
        res.json(resultado)
    }

}
