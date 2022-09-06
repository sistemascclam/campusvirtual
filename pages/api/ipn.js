import prisma from 'lib/prisma'

export default async function handle(req, res) {
    const formData = req.body
    const formQuery = req.query
    await prisma.ipn.create({
        data: {
            response: JSON.stringify(formData)+"get:"+JSON.stringify(formQuery),
        }
    })
    res.json({message:"Request send"})
}
