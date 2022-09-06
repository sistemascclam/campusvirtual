import formidable from "formidable";
import fs from "fs";
import { getSession } from 'next-auth/react';

export const config = {
    api: {
        bodyParser: false
    }
};

export default async (req, res) => {
    if (req.method !== "POST") res.status(404).send("");
    const session = await getSession({ req })

    try {
        const form = new formidable.IncomingForm();
        const rpta = form.parse(req, async function (err, fields, files) {
            let file = files.file
            let { code } = fields
            const {message,status} = await checkCart({ file, code, session });
            if (!status) {
                res.status(400).json(message);
            }
            res.status(200).json({ message: "Registro exitoso" })
        });
    } catch (error) {
        res.status(400).json("No se pudo registrar");
    }
};

const checkCart = async ({ file, code, session }) => {
    try {
        let prismaTransResponse = 
        await prisma.$transaction(async (prisma) => {
            var auxId = null

            if (session?.user != null) {
                auxId = session.user.id
            }

            let requestVoucherSaveData = {
                'idUsuario': auxId,
            },
                requestedVoucherDetailData = []

            if (auxId) {
                if (code && code != undefined && code != 'undefined') {
                    const dcc = await prisma.DiscountCodes.findFirst({
                        where: {
                            code: code.toLocaleUpperCase().trim(),
                            active: true,
                        },
                        select: {
                            id: true,
                            code: true,
                            monto: true
                        }
                    })

                    requestVoucherSaveData.idDescuento = dcc.id
                    requestVoucherSaveData.amountDiscount = parseFloat(dcc.monto)
                }

                const shopingHistory = await prisma.shopingCart.findMany({
                    where: {
                        idUsuario: auxId,
                        active: true,
                        curso: {
                            active: true
                        }
                    },
                    select: {
                        id: true,
                        active: true,
                        curso: {
                            select: {
                                id: true,
                                price: true,
                            }
                        },
                    }
                })

                requestVoucherSaveData.amount = shopingHistory?.map(sh => sh.curso).reduce((a, b) => { return a + b.price }, 0)

                const { route, status } = await saveFile(file);

                if (!status) {
                    return {
                        message: "Error al cargar archivo",
                        status: false
                    }
                }

                requestVoucherSaveData.file = route

                const addRequestVoucher = await prisma.RequestedVoucher.create({
                    data: requestVoucherSaveData,
                })

                if (!addRequestVoucher) {
                    return {
                        message: "Problemas al registrar",
                        status: false
                    }
                }

                shopingHistory.forEach((val, i) => {
                    requestedVoucherDetailData.push({
                        idRequestedVoucher: addRequestVoucher.id,
                        idCurso: val.curso.id,
                        price: val.curso.price
                    })
                })

                const addRequestVoucherDetail = await prisma.RequestedVoucherDetail.createMany({
                    data: requestedVoucherDetailData,
                })

                if (!addRequestVoucherDetail) {
                    return {
                        message: "Problemas al registrar",
                        status: false
                    }
                }

                return {
                    message: "Registro exitoso",
                    status: true
                }
            } else {
                return {
                    message: "No autenticado",
                    status: false
                }
            }
        })
        return prismaTransResponse;
    } catch (err) {
        return {
            message: err,
            status: false
        }
    }
}

const saveFile = async (file) => {
    const type = file.mimetype.split("/").pop();
    const validTypes = ["jpg", "jpeg", "png", "pdf"];
    if (validTypes.indexOf(type) === -1) {
        return {
            route: `Solicitud inválida`,
            status: false
        };
    }
    const data = fs.readFileSync(file.filepath);
    fs.writeFileSync(`${process.cwd()}/public/saved/${file.newFilename}.${type}`, data);
    fs.unlinkSync(file.filepath);

    return {
        route: `/saved/${file.newFilename}.${type}`,
        status: true
    };
};