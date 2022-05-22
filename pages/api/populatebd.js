import prisma from 'lib/prisma'
import { getRandomNumber, stringToSlug } from 'util/helper'

export default async function handle(req, res) {
    const categories = await prisma.category.createMany({
        skipDuplicates: true,
        data: [
            { id: 1, name: 'Administración', slug: 'administracion' },
            { id: 2, name: 'Informática y Comunicaciones', slug: 'informatica-y-comunicaciones' },
            { id: 3, name: 'Recursos Humanos', slug: 'recursos-humanos' },
            { id: 4, name: 'Psicología', slug: 'psicologia' },
            { id: 5, name: 'Offimática', slug: 'offimatica' },
            { id: 6, name: 'Legal', slug: 'legal' }
        ],
    })
    await prisma.ShopingCart.deleteMany({})
    await prisma.Favorites.deleteMany({})
    await prisma.Leccion.deleteMany({})
    await prisma.HelperLeccion.deleteMany({})
    await prisma.Progress.deleteMany({})
    await prisma.Qualification.deleteMany({})
    await prisma.Curso.deleteMany({})
    const cursos = await prisma.Curso.createMany({
        skipDuplicates: true,
        data: [
            {
                "title": "Gerencia",
                "name": "Anibal Cruz",
                "description": "Este es la primera descripción",
                "valuation": getRandomNumber(0,5),
                "image":"https://raw.githubusercontent.com/sistemascclam/cclamweb/main/public/images/servicios/desarrolloempresarial/especialidades/gerencia.jpg",
                "price": 0,
                "priceWODiscount": getRandomNumber(20,200,2),
                "ruta": stringToSlug("Gerencia"),
                "categoryId": 1,
                "texto": " HTML el lenguaje de marcado para la web |,| CSS el lenguaje de estilos que le dará color a tus aplicaciones |,| CSS grid, la grilla de CSS |,| HTML el lenguaje de marcado para la web |,| HTML el lenguaje de marcado para la web |,| CSS el lenguaje de estilos que le dará color a tus aplicaciones |,| CSS grid, la grilla de CSS |,| HTML el lenguaje de marcado para la web |,| HTML el lenguaje de marcado para la web |,| CSS el lenguaje de estilos que le dará color a tus aplicaciones |,| CSS grid, la grilla de CSS |,| HTML el lenguaje de marcado para la web |,| HTML el lenguaje de marcado para la web |,| CSS el lenguaje de estilos que le dará color a tus aplicaciones |,| CSS grid, la grilla de CSS |,| HTML el lenguaje de marcado para la web |,| " 
            },
            {
                "title": "Banca y Finanzas",
                "name": "Andy Geanmark",
                "description": "Este es la segunda descripción",
                "valuation": getRandomNumber(0,5),
                "image":"https://raw.githubusercontent.com/sistemascclam/cclamweb/main/public/images/servicios/desarrolloempresarial/especialidades/finanzas.jpg",
                "price": null,
                "ruta": stringToSlug("Banca y Finanzas"),
                "categoryId": 1,
                "texto": " HTML el lenguaje de marcado para la web |,| CSS el lenguaje de estilos que le dará color a tus aplicaciones |,| CSS grid, la grilla de CSS |,| HTML el lenguaje de marcado para la web |,| HTML el lenguaje de marcado para la web |,| CSS el lenguaje de estilos que le dará color a tus aplicaciones |,| CSS grid, la grilla de CSS |,| HTML el lenguaje de marcado para la web |,| HTML el lenguaje de marcado para la web |,| CSS el lenguaje de estilos que le dará color a tus aplicaciones |,| CSS grid, la grilla de CSS |,| HTML el lenguaje de marcado para la web |,| HTML el lenguaje de marcado para la web |,| CSS el lenguaje de estilos que le dará color a tus aplicaciones |,| CSS grid, la grilla de CSS |,| HTML el lenguaje de marcado para la web |,| " 
            },
            {
                "title": "Administración de Negocios",
                "name": "Administración de Negocios",
                "description": "Este es la tercera descripción",
                "valuation": getRandomNumber(0,5),
                "image":"https://raw.githubusercontent.com/sistemascclam/cclamweb/main/public/images/servicios/desarrolloempresarial/especialidades/administracion.jpg",
                "price": 0,
                "priceWODiscount": getRandomNumber(20,200,2),
                "ruta": stringToSlug("Administración de Negocios"),
                "categoryId": 1,
                "texto": " HTML el lenguaje de marcado para la web |,| CSS el lenguaje de estilos que le dará color a tus aplicaciones |,| CSS grid, la grilla de CSS |,| HTML el lenguaje de marcado para la web |,| HTML el lenguaje de marcado para la web |,| CSS el lenguaje de estilos que le dará color a tus aplicaciones |,| CSS grid, la grilla de CSS |,| HTML el lenguaje de marcado para la web |,| HTML el lenguaje de marcado para la web |,| CSS el lenguaje de estilos que le dará color a tus aplicaciones |,| CSS grid, la grilla de CSS |,| HTML el lenguaje de marcado para la web |,| HTML el lenguaje de marcado para la web |,| CSS el lenguaje de estilos que le dará color a tus aplicaciones |,| CSS grid, la grilla de CSS |,| HTML el lenguaje de marcado para la web |,| " 
            },
            {
                "title": "Administración Aduanera",
                "name": "Administración Aduanera",
                "description": "",
                "valuation": getRandomNumber(0,5),
                "image":"https://raw.githubusercontent.com/sistemascclam/cclamweb/main/public/images/servicios/desarrolloempresarial/especialidades/aduanas.jpg",
                "price": getRandomNumber(20,200,2),
                "ruta": stringToSlug("Administración Aduanera"),
                "categoryId": 1
            },
            {
                "title": "Desarrollo Económico y Contable",
                "name": "Desarrollo Económico y Contable",
                "description": "",
                "valuation": getRandomNumber(0,5),
                "image":"https://raw.githubusercontent.com/sistemascclam/cclamweb/main/public/images/servicios/desarrolloempresarial/especialidades/conta.jpg",
                "price": getRandomNumber(20,200,2),
                "ruta": stringToSlug("Desarrollo Económico y Contable"),
                "categoryId": 1
            },
            {
                "title": "Mercadeo",
                "name": "Mercadeo",
                "description": "",
                "valuation": getRandomNumber(0,5),
                "image":"https://raw.githubusercontent.com/sistemascclam/cclamweb/main/public/images/servicios/desarrolloempresarial/especialidades/mercadeo.jpg",
                "price": getRandomNumber(20,200,2),
                "ruta": stringToSlug("Mercadeo"),
                "categoryId": 1
            },
            {
                "title": "Asistencia",
                "name": "Asistencia",
                "description": "",
                "valuation": getRandomNumber(0,5),
                "image":"https://raw.githubusercontent.com/sistemascclam/cclamweb/main/public/images/servicios/desarrolloempresarial/especialidades/asistencia.jpg",
                "price": getRandomNumber(20,200,2),
                "ruta": stringToSlug("Asistencia"),
                "categoryId": 1
            },
            {
                "title": "Administración en redes",
                "name": "Administración en redes",
                "description": "",
                "valuation": getRandomNumber(0,5),
                "image":"https://raw.githubusercontent.com/sistemascclam/cclamweb/main/public/images/servicios/desarrolloempresarial/especialidades/redes.jpg",
                "price": getRandomNumber(20,200,2),
                "ruta": stringToSlug("Administración en redes"),
                "categoryId": 2
            },
            {
                "title": "Manejo de Multimedia",
                "name": "Manejo de Multimedia",
                "description": "",
                "valuation": getRandomNumber(0,5),
                "image":"https://raw.githubusercontent.com/sistemascclam/cclamweb/main/public/images/servicios/desarrolloempresarial/especialidades/multimedia.jpg",
                "price": getRandomNumber(20,200,2),
                "ruta": stringToSlug("Manejo de Multimedia"),
                "categoryId": 2
            },
            {
                "title": "Community Maneger",
                "name": "Community Maneger",
                "description": "",
                "valuation": getRandomNumber(0,5),
                "image":"https://raw.githubusercontent.com/sistemascclam/cclamweb/main/public/images/servicios/desarrolloempresarial/especialidades/comunitymanager.jpg",
                "price": getRandomNumber(20,200,2),
                "ruta": stringToSlug("Community Maneger"),
                "categoryId": 2
            },
            {
                "title": "Marketing",
                "name": "Marketing",
                "description": "",
                "valuation": getRandomNumber(0,5),
                "image":"https://raw.githubusercontent.com/sistemascclam/cclamweb/main/public/images/servicios/desarrolloempresarial/especialidades/marketing.jpg",
                "price": getRandomNumber(20,200,2),
                "ruta": stringToSlug("Marketing"),
                "categoryId": 2
            },
            {
                "title": "Publicidad",
                "name": "Publicidad",
                "description": "",
                "valuation": getRandomNumber(0,5),
                "image":"https://raw.githubusercontent.com/sistemascclam/cclamweb/main/public/images/servicios/desarrolloempresarial/especialidades/redes.jpg",
                "price": getRandomNumber(20,200,2),
                "ruta": stringToSlug("Publicidad"),
                "categoryId": 2
            },
            {
                "title": "Publicidad",
                "name": "Publicidad",
                "description": "",
                "valuation": getRandomNumber(0,5),
                "image":"https://raw.githubusercontent.com/sistemascclam/cclamweb/main/public/images/servicios/desarrolloempresarial/especialidades/publicidad.jpg",
                "price": getRandomNumber(20,200,2),
                "ruta": stringToSlug("Publicidad"),
                "categoryId": 2
            },
            {
                "title": "Recursos Humanos y/o Talento Humano",
                "name": "Recursos Humanos y/o Talento Humano",
                "description": "",
                "valuation": getRandomNumber(0,5),
                "image":"https://raw.githubusercontent.com/sistemascclam/cclamweb/main/public/images/servicios/desarrolloempresarial/especialidades/rrhh.jpg",
                "price": getRandomNumber(20,200,2),
                "priceWODiscount": getRandomNumber(20,200,2),
                "ruta": stringToSlug("Recursos Humanos y/o Talento Humano"),
                "categoryId": 3
            },
            {
                "title": "Cómo Convivir con el estrés Postpandemia",
                "name": "Cómo Convivir con el estrés Postpandemia",
                "description": "",
                "valuation": getRandomNumber(0,5),
                "image":"https://www.cclam.org.pe/recursos.base/public/storage/courses/2022/03/CqzeFz6SHaT7MFaZcYJfyICQp389M72VrOr2WGs5.png",
                "price": getRandomNumber(20,200,2),
                "ruta": stringToSlug("Cómo Convivir con el estrés Postpandemia"),
                "categoryId": 4
            }
        ]
    })
    const leccion = await prisma.leccion.createMany({
        skipDuplicates: true,
        data: [
            { id: "160b4d59b33a4703b566134c288654d1", title: 'Gerencia - Parte 1', url: '/videos/videoprueba.mp4', orden:1, idCurso:1, duracion:20.5 },
            { id: "a442d68302ac420889027ad4e3797949", title: 'Gerencia - Parte 2', url: '/videos/videoprueba2.mp4', orden:2, idCurso:1, duracion:30 },
            { id: "c53419412cda4c9aab237b3bdb264a28", title: 'Banca y Finanzas - Parte 1', url: '/videos/videoprueba.mp4', orden:1, idCurso:2, duracion:35 },
            { id: "a31156a87fb34d45918beb450eeff8bd", title: 'Banca y Finanzas - Parte 2', url: '/videos/videoprueba2.mp4', orden:2, idCurso:2, duracion:22 },
            { id: "7af2a65475d64b3f9ff9421d9cf8d6d8", title: 'Banca y Finanzas - Parte 3', url: '/videos/videoprueba.mp4', orden:3, idCurso:2, duracion:25.5 },
        ],
    })
    res.status(200).json({ name: 'BD llenada', categories, cursos,leccion })
}