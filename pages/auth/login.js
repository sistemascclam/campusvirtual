import Head from 'next/head'
import Layout, { siteTitle } from "../../components/global/layout";
import React from 'react';

export default function Login() {
    return (
        <Layout home>
            <Head>
                <title>Inicio de Sesión | {siteTitle}</title>
            </Head>
            <div className="flex h-screen">
                <div className="bg-darkblue text-white w-1/2 p-4">div 1</div>
                <div className="bg-blue-800 text-white w-1/2 p-4">div 2</div>
            </div>
        </Layout>
    );
}
