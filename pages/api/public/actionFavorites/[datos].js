import prisma from 'lib/prisma'
import { getSession } from 'next-auth/react';

export default async function handle(req, res) {
    const session = await getSession({req})
    var auxId ='0'
    if(session?.user != null){
      auxId = session.user.id
    }

    if(auxId !='0'){
        const {datos} = req.query 
        var data = datos.split('--')
        var idFavorite = data[1]

        switch (data[0]) {
            case 'activ':
                const result1 = await prisma.favorites.update({
                    where:{
                        id : parseInt(idFavorite),
                    },
                    data: {
                        active: true
                    },
                })
                break; 
            case 'remov':
                const result2 = await prisma.favorites.update({
                    where:{
                        id : parseInt(idFavorite),
                    },
                    data: {
                        active: false
                    },
                })
                break; 
        }

    }

    res.status(200).json('arrayData')
} 