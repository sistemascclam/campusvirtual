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
        const {customer} = data
        res.json(data)
    } else {
        res.status(401).json("Unauthorized")
    }
}