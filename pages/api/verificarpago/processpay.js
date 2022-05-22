import axios from '@util/Api';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    const session = await getSession({ req })
    const {data} = req.body
    var auxId = null
    if (session?.user != null) {
        auxId = session.user.id
    }

    if (auxId) {
        const { customer } = data
        customer.shoppingCart.cartItemInfo.forEach(c=>{
            addCursoAProgress(c.productRef)
        })
        res.json(data)
    } else {
        res.status(401).json("Unauthorized")
    }
}

const addCursoAProgress = async (idCurso) => {
    const progressres = await prisma.progress.count({
        where: {
          idUsuario: auxId,
          idCurso: parseInt(idCurso),
        }
      })

    if(progressres == 0){
        await prisma.progress.create({
            data: {
                'idUsuario' : auxId,
                'idCurso' : parseInt(idCurso) ,
            },
        })
    
        await prisma.shopingCart.update({
            where:{
                id : parseInt(idCurso),
            },
            data: {
                active: false
            },
        })

        await prisma.ShoppingHistory.create({
            data: {
                'idUsuario' : auxId,
                'idCurso' : parseInt(idCurso),
            },
        })

    }
}