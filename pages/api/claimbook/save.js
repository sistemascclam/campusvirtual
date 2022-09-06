import prisma from 'lib/prisma'
import { getSession } from 'next-auth/react';

export default async function handle(req, res) {
    const { formData } = req.body
    if (req.method == "POST") {
        await prisma.ClaimBook.create({
            data: formData,
        })
    }

    res.status(200).json({message:'Guardado en libro de reclamaciones'})
}   