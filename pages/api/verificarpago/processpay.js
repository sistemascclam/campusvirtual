import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    const session = await getSession({ req })
    const { data } = req.body
    var auxId = null
    if (session?.user != null) {
        auxId = session.user.id
    }

    if (auxId) {
        const { customer } = data

        var transactionList = []
        var orderIdParam = data.orderDetails.orderId
        if (orderIdParam) {
            const shopingHistoryId = await prisma.ShoppingHistory.findFirst({
                where: {
                    id: parseInt(orderIdParam),
                }
            })

            const shopingHistoryUpdate = prisma.ShoppingHistory.update({
                where: {
                    id: parseInt(shopingHistoryId.id),
                },
                data: {
                    'active': true,
                    'metadata': JSON.stringify(data),
                },
            })
            transactionList.push(shopingHistoryUpdate)
        } else {
            const shopingHistoryNew = prisma.ShoppingHistory.create({
                data: {
                    'idUsuario': auxId,
                    'monto': parseFloat(data?.orderDetails?.orderTotalAmount) / 100,
                    'metadata': JSON.stringify(data),
                },
            })
            orderIdParam = shopingHistoryNew?.id
            transactionList.push(shopingHistoryNew)
        }

        customer.shoppingCart.cartItemInfo.forEach(c => {
            transactionList = transactionList.concat(addCursoAProgress(c.productRef, c.productAmount, auxId, orderIdParam))
        })

        console.log(transactionList)
        await prisma.$transaction(transactionList)
        res.json(data)
    } else {
        res.status(401).json("Unauthorized")
    }
}



const addCursoAProgress = async (idCurso, monto, idUsuario, idShopingHistory) => {
    var transactionList=[]
    const progressres = await prisma.progress.count({
        where: {
            'idUsuario': idUsuario,
            'idCurso': parseInt(idCurso),
        }
    })

    if (progressres == 0) {
        const createProgress = prisma.progress.create({
            data: {
                'idUsuario': idUsuario,
                'idCurso': parseInt(idCurso),
            },
        })
        transactionList.push(createProgress)

        const cartToDelete = await prisma.shopingCart.findFirst({
            where: {
                'idCurso': parseInt(idCurso),
                'idUsuario': idUsuario,
                'active': true
            },
            select: {
                id: true
            },
        })

        const cleanShopingCart = prisma.shopingCart.update({
            where: {
                'id': cartToDelete.id,
            },
            data: {
                active: false
            },
        })
        transactionList.push(cleanShopingCart)

        const createShopingHistoryDetail = prisma.ShopintHistoryDetail.create({
            data: {
                'idShopingHistory': parseInt(idShopingHistory),
                'idCurso': parseInt(idCurso),
                'monto': monto / 100,
            },
        })
        transactionList.push(createShopingHistoryDetail)
    }
    return transactionList

}