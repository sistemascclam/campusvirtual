import { getSession } from 'next-auth/react';

export default async function handle(req, res) {
    const session = await getSession({ req })
    var auxId = null
    if (session?.user != null) {
        auxId = session.user.id
    }

    if (auxId) {
        console.log(req.query);
        res.json({
            Payment: req.query.payment_id,
            Status: req.query.status,
            MerchantOrder: req.query.merchant_order_id
        });
    } else {
        res.status(401).json("Unauthorized")
    }
}