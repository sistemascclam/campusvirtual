import Head from 'next/head'
export const siteTitle = 'Campus Cámara'
export const siteDescription = 'Campus Virtual 24/7. | Cámara de Comercio y Producción de Lambayeque'
export const siteURL = 'https://www.cclam.org.pe/'
export const siteImage = 'https://www.cclam.org.pe/images/post.png'
export const keywords = 'campus virtual, campus, virtual, cursos, cclam, chiclayo, camara, comercio, lambayeque'

export default function Layout({ children }) {

  return (
    <>
      <Head>
        <link rel="icon" href={`./favicon.ico`} />

        <title>{siteTitle}</title>
        <meta name="title" content={siteTitle} />
        <meta name="description" content={siteDescription} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteURL} />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:image" content={siteImage} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={siteURL} />
        <meta property="twitter:title" content={siteTitle} />
        <meta property="twitter:description" content={siteDescription} />
        <meta property="twitter:image" content={siteImage}></meta>

        <meta name="keywords" content={keywords} />

      </Head>
      <main className="bg-themeWhite font-poppins relative">
        {children}
      </main>
    </>
  )
}