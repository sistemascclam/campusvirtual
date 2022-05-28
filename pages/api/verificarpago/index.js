import axios from '@util/Api';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    const session = await getSession({ req })
    // const { code } = req.query
    const { code } = req.body
    var auxId = null
    if (session?.user != null) {
        auxId = session.user.id
    }

    if (auxId) {
        let discount = 0;
        if (code) {
            const dcc = await prisma.DiscountCodes.findFirst({
                where: {
                    code: code.toLocaleUpperCase().trim(),
                    active: true,
                },
                select: {
                    monto: true
                }
            })
            discount = (dcc?.monto ?? 0)
        }

        const cursos = await prisma.shopingCart.findMany({
            where: {
                idUsuario: auxId,
                active: true,
                curso: {
                    active: true
                }
            },
            select: {
                curso: {
                    select: {
                        id: true,
                        title: true,
                        price: true,
                    }
                },
            }
        })

        let total = (cursos?.reduce((a, b) => { return a + b.curso.price }, 0) - discount).toFixed(2) * 100

        let cartItemInfo = cursos?.map(p => { return { productRef: p.curso.id, productLabel: p.curso.title, productType: "SERVICE_FOR_BUSINESS", productAmount: (p.curso.price * 100).toFixed(2), productQty: 1 } })

        const shopingHistory = await prisma.ShoppingHistory.create({
            data: {
                'idUsuario': auxId,
                'monto': total/100,
                'active': false
            },
        })

        const axiosReq = await axios
            .post('https://api.micuentaweb.pe/api-payment/V4/Charge/CreatePayment',
                {
                    // "ipnTargetUrl": "https://www.cclam.org.pe/recursos.base/public/api/ipn",
                    "amount": total,
                    "currency": "PEN",
                    "orderId": shopingHistory?.id,
                    "customer": {
                        "email": session?.user?.email,
                        "shoppingCart": {
                            "cartItemInfo": cartItemInfo
                        }
                    }
                },
                {
                    headers: {
                        'Authorization': `Basic ${process.env.IZI_KEY}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
        const { data } = axiosReq
        res.json(data)
    } else {
        res.status(401).json("Unauthorized")
    }
}