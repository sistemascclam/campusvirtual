import prisma from 'lib/prisma'
import { getSession } from 'next-auth/react';

export default async function handle(req, res) {
    const session = await getSession({req})
    var auxId ='0'
    var resultado = []

    if(session?.user != null){
      auxId = session.user.id
    }

    if(auxId !='0'){
        const {datos} = req.query 
        var data = datos.split('--')
        var idFavorite = data[1]

        switch (data[0]) {
            case 'activ':
                resultado = await prisma.shopingCart.update({
                    where:{
                        id : parseInt(idFavorite),
                    },
                    data: {
                        active: true
                    },
                })
                break; 
            case 'remov':
                var resp = await prisma.shopingCart.update({
                    where:{
                        id : parseInt(idFavorite),
                    },
                    data: {
                        active: false
                    },
                })
                resultado = await prisma.shopingCart.findMany({
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

                break; 
        }

    }
    //res.status(200).json('arrayData')
    res.json(resultado)
} 

