import React, { useState, useEffect } from 'react'
import prisma from 'lib/prisma'
import { getSession } from 'next-auth/react';

export default async function handle(req, res) {
    const session = await getSession({req})
    const  {dato}  = req.query

    var auxId ='0'
    if(session?.user != null){
      auxId = session.user.id
    }
    var curso = ''
    var resultado = []
    curso = await prisma.favorites.findMany({
      where: {
        idUsuario: auxId,
        active: true,
      }, 
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
      } 
    }) 

    if (dato != '0') {
      resultado.push({
        action: 'BD',
        arrayC: curso,
      })
      res.json(resultado)
    }else{
      res.json(curso)
    }
}



