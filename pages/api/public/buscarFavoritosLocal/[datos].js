import prisma from 'lib/prisma'

export default async function handle(req, res){
    var resultado = []
    var arrayData = []
    const {datos} = req.query 
    var data = datos.split('--')
    var dataGeneral = JSON.parse(data[0])
    var textoBuscar = data[1]

    for (let i = 0; i < dataGeneral.length; i++) {
        let auxD = []

        if(dataGeneral[i].active == true){ 
            var searchCourses = await prisma.curso.findMany({
                select : {
                    id: true,
                    title: true,
                    description: true,
                    name: true,
                    valuation: true,
                    image: true,
                    price: true,
                    registration_date: true,
                    ruta: true,
                    texto: true,
                },
                where: {
                active: true,
                id: dataGeneral[i].idCurso,
                OR: [
                    {
                        title:{
                            contains: textoBuscar
                        }
                    },
                    {
                        name:{
                            contains: textoBuscar
                        }
                    }, 
                ]
                },
            })
            if(searchCourses != ''){
                resultado.push({
                    idCurso: dataGeneral[i].idCurso,
                    active: true,
                })
            }
        }
    }
    arrayData.push({
        action: 'localStorage',
        arrayC: JSON.stringify(resultado),
    })

    res.json(arrayData)

}