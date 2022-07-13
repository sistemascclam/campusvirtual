import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Layout, { siteTitle } from "@global/layout";
import { getCsrfToken, getSession, useSession } from 'next-auth/react';
import axios from '@util/Api';
import { toMoney } from '@util/helper';
import moment from "moment";
import 'moment/locale/es';
moment.locale('es')

const vids = [
    {
        id: 1,
        src: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FCristianAlvarezGT%2Fvideos%2F3291323367818730%2F&show_text=false&width=560&t=0"
    },
    {
        id: 2,
        src: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FCristianAlvarezGT%2Fvideos%2F1046558062899322%2F&show_text=false&width=560&t=0"
    },
    {
        id: 3,
        src: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FCristianAlvarezGT%2Fvideos%2F3183391835261598%2F&show_text=false&width=560&t=0"
    },
    {
        id: 4,
        src: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FCristianAlvarezGT%2Fvideos%2F744658666786642%2F&show_text=false&width=560&t=0"
    },
]

export default function Lives() {
    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <div className='w-full'>
                <div className='text-2xl font-serif font-bold font-mono text-slate-50 '>
                    <div className='w-max pb-2 border-b-2 border-transparent pl-1 pr-2 border-blue-600'>
                        Lives
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-6 pb-20">
                <VideoLive principal={true}
                    src={vids[0].src}
                />
                <div className='col-span-1 grid grid-cols-1 '>
                    <p className='w-max pb-2 text-slate-50 text-xl'>
                        Recurda otros lives
                    </p>
                    {
                        vids?.filter((v, vi) => vi > 0 && vi <= 2).map((v, vi) =>
                            <VideoLive key={vi} src={v.src} />
                        )
                    }
                    <button className='bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl py-2 text-white hover:from-blue-800 shadow-xl'>Ver más</button>
                </div>
            </div>

        </Layout>
    )
}

const VideoLive = ({ principal = false, src }) => {
    return (
        <div className={`${principal ? `h-[580px] w-full col-span-3 row-span-3` : 'h-56'}  rounded-xl overflow-hidden shadow-lg`}>
            <iframe src={src} width={"100%"} height={"100%"} style={{ border: "none", overflow: "hidden" }} scrolling="no" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
        </div>
    )
}


//No acceder a la ruta si el usuario está logeado
export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    };
}
