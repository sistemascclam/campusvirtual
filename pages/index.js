import Head from 'next/head'
import Layout, { siteTitle } from "../components/global/layout";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      Campus Cámara
    </Layout>
  )
}
