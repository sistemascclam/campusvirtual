import prisma from 'lib/prisma'
import { getSession } from 'next-auth/react'

export default async function handle(req, res) {
    const session = await getSession({ req })
    var auxId = null
    if (session?.user == null) {
        res.status(401).json("Unauthorized")
    }
    auxId = session.user.id
    var profile=null
    if (req.method == "POST") {
        const formData = req.body
        profile = await prisma.profile.upsert({
            where: {
                userId: auxId,
            },
            update: {
                ...formData,
                tipoDoc:formData.tipoDoc ? parseInt(formData.tipoDoc): null,
            },
            create: {
                ...formData,
                tipoDoc:formData.tipoDoc ? parseInt(formData.tipoDoc): null,
                userId:auxId
            },
        })
    } else {
        profile = await prisma.profile.findUnique({
            where: {
                userId: auxId
            }
        })
    }
    res.json(profile || {})
}
