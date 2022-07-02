import formidable from "formidable";
import fs from "fs";

export const config = {
    api: {
        bodyParser: false
    }
};

export default async (req, res) => {
    if(req.method !== "POST") res.status(404).send("");

    const form = new formidable.IncomingForm();
    const rpta = form.parse(req, async function (err, fields, files) {
        const response = await saveFile(files.file);
        return response
    });
    
    if(!rpta) res.status(400).json("No se pudo registrar");
    res.status(200).json({message:"Registro exitoso"})
};

const saveFile = async (file) => {
    // const addRequestVoucher = await prisma.RequestedVoucher.create({
    //     data: {
    //         // "file": "",
    //         "amount": "",
    //         "amountDiscount": "",
    //         "idDescuento": "",
    //         'idUsuario': auxId,
    //     },
    // })
    
    const type = file.mimetype.split("/").pop();
    const validTypes = ["jpg", "jpeg", "png", "pdf"];
    if (validTypes.indexOf(type) === -1) {
      return false;
    }
    const data = fs.readFileSync(file.filepath);
    fs.writeFileSync(`${process.cwd()}/public/saved/${file.newFilename}.${type}`, data);
    fs.unlinkSync(file.filepath);

    return true;
};