import { getSession } from 'next-auth/react';
const mercadopago = require("mercadopago");

mercadopago.configure({
    access_token: process.env.MP_ACCESS_TOKEN,
});

export default async function handler(req, res) {
    const session = await getSession({ req })
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
                        image: true
                    }
                },
            }
        })

        let total = (cursos?.reduce((a, b) => { return a + b.curso.price }, 0) - discount).toFixed(2) * 100

        let cartItemInfo = cursos?.map(p => {
            return {
                id: p.curso.id, 
                title: p.curso.title,
                picture_url: p.curso.image,
                unit_price: Number((p.curso.price).toFixed(2)),
                quantity: 1,
                currency_id: 'PEN'
            }
        })

        const shopingHistory = await prisma.ShoppingHistory.create({
            data: {
                'idUsuario': auxId,
                'monto': total / 100,
                'active': false
            },
        })

        let preference =
        {
            payer: {
                email: session?.user?.email,
            },
            items: cartItemInfo,
            notification_url:'https://www.cclam.org.pe/recursos.base/public/api/ipnmp',
            back_urls: {
                "success": `${process.env.NEXT_PUBLIC_URL_DOMAIN}verificarpago/feedback`,
                "failure": `${process.env.NEXT_PUBLIC_URL_DOMAIN}verificarpago/feedback`,
                "pending": `${process.env.NEXT_PUBLIC_URL_DOMAIN}verificarpago`
            },
            auto_return: "approved",
        }


        mercadopago.preferences.create(preference)
            .then(function (response) {
                res.json({
                    id: response.body.id,
                    extra:response.body
                });
            }).catch(function (error) {
                console.log(error);
            });
    } else {
        res.status(401).json("Unauthorized")
    }
}