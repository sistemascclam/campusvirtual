import prisma from 'lib/prisma'
import { getSession } from 'next-auth/react';

export default async function handle(req, res) {
    const session = await getSession({ req })
    var auxId = null
    if (session?.user != null) {
        auxId = session.user.id
    }

    const {code} = req.body

    if (auxId) {
        if(code){
            const dcc = await prisma.DiscountCodes.findFirst({
              where: {
                code: code.toLocaleUpperCase().trim(),
                active: true,
              },
              select:{
                  code:true,
                  monto:true
              }
            })
            res.json(dcc)
        }else{
            res.json(0)
        }
    } else {
        res.status(401).json("Unauthorized")
    }
}