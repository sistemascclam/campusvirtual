import prisma from 'lib/prisma'

export default async function handle(req, res) {
    const formData = req.body
    await prisma.ipn.create({
        data: {
            response: JSON.stringify(formData),
        }
    })
    res.json({message:"Request send"})
}
