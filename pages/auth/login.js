import Head from 'next/head'
import Layout, { siteTitle } from "../../components/global/layout";
import React from 'react';

export default function Login() {
    return (
        <Layout home>
            <Head>
                <title>Inicio de Sesión | {siteTitle}</title>
            </Head>
            Daniela Paiva
        </Layout>
    );
}
