import prisma from 'lib/prisma'
import { getSession } from 'next-auth/react'

export default async function handle(req, res) {
    const session = await getSession({ req })
    var auxId = null
    if (session?.user == null) {
        res.status(401).json("Unauthorized")
    }
    auxId = session.user.id
    const {correo_eliminar_cuenta} = req.body
    console.log(correo_eliminar_cuenta === session?.user?.email);
    if(correo_eliminar_cuenta !== session?.user?.email){
        res.status(400).json({message:"Los correos no coinciden"})
    }else{
        let accountId = await prisma.account.findFirst({
            where: {
                userId: auxId,
            }})
        await prisma.account.update({
            where: {
                id: accountId.id,
            },
            data: {
                providerAccountId:accountId.providerAccountId+'0',
                access_token:'',
            },
        })
        await prisma.user.update({
            where: {
                id: auxId,
            },
            data: {
                deletedEmail:session.user.email,
                email:''
            },
        })
        res.json({message:"Cuenta eliminada"})
    }
}
