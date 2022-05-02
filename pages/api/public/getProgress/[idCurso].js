import React, { useState, useEffect } from 'react'
import prisma from 'lib/prisma'
import { getSession } from 'next-auth/react';

export default async function handle(req, res) {
    const session = await getSession({req})
    const  {idCurso}  = req.query
    var arrayData = idCurso.split('|.|')
 
    var auxId ='0'
    if(session?.user != null){
      auxId = session.user.id
    }
    var resultado = []
    if (arrayData[0] == '0') { //búsqueda por id
      resultado = await prisma.progress.findMany({
        where: {
          idUsuario: auxId,
          idCurso: parseInt(arrayData[1]),
          active: true,
        }, 
        select: {
          id: true,
        } 
      }) 
    }else{ //búsqueda por descripción
      resultado = await prisma.progress.findMany({
        select: {
          id: true,
          advance: true,
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
          qualification:{
            select : {
              id: true,
              description: true,
              star: true,
            }
          }
        },
        where: {
          active: true,
          curso:{
            title:{
              contains: arrayData[1]
            }
          }, 
        },
      }) 
    }


    
    var _array = []
    if (resultado.length > 0) {
      _array.push({
        //data: 'SI'
        data: 'Ir al curso',
        resultado: resultado
      })
    }else{
      _array.push({
        //data: 'NO'
        data: 'Inscribirse ahora',
        resultado: resultado
      })
    }
    
    res.json(_array)   
}



