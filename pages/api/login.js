import prisma from 'lib/prisma'
const crypto = require('crypto');

export default async function handler(req, res) {
    const { email, password } = req.body
    let passwordEncrypted = crypto.createHash('sha512').update(password).digest("hex");
    if (!email) {
        res.status(400).send({
            error: 'This is an error!'
        })
    } else {
        const resuser = await prisma.user.findFirst({
            where: {
                email: email,
                password: passwordEncrypted
            },
        })
        if (resuser) {
            const { password,emailVerified,...user} = resuser;
            // res.status(200).json({ id: 1, name: 'J Smith', email: 'jsmith@example.com' })
            res.status(200).json(user)
        } else {
            res.status(404).send({
                error: 'This is an error!'
            })
        }
    }
}