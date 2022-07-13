import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    const session = await getSession({ req })
    var auxId = null
    if (session?.user != null) {
        auxId = session.user.id
    }

    if (auxId) {
        const shopingHistory = await prisma.RequestedVoucher.findMany({
            where: {
                idUsuario: auxId,
                active: true
            },
            select: {
                id: true,
                file: true,
                status: true,
                motivo: true,
                amount: true,
                amountDiscount: true,
                registration_date: true,
                descuento: {
                    select: {
                        code: true,
                        description: true
                    }
                },
                requestedVoucherDetails:{
                    select:{
                        price:true,
                        curso:{
                            select:{
                                title:true
                            }
                        }
                    }
                }
                
            },
            orderBy: {
                registration_date: 'desc',
            },
        })

        res.json(shopingHistory)
    } else {
        res.status(401).json("Unauthorized")
    }
}