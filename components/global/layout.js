import Head from 'next/head'
export const siteTitle = 'Campus Cámara'
export const siteDescription = 'Campus Virtual 24/7. | Cámara de Comercio y Producción de Lambayeque'
export const siteURL = 'https://www.cclam.org.pe/'
export const siteImage = 'https://www.cclam.org.pe/images/post.png'
export const keywords = 'campus virtual, campus, virtual, cursos, cclam, chiclayo, camara, comercio, lambayeque'
import Header from '@global/header';
import Footer from './footer'
import Image from 'next/image'

export default function Layout({ home, children, widthPadding = true, widthPaddingX = true }) {

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
      {
        home &&
        <div className="relative w-full h-[500px] hidden md:block">
          <Image
            className='h-full w-full'
            src={"/images/header/header.png"}
            alt={"header"}
            objectFit={"cover"}
            layout="fill"
            objectPosition={"center"}
          />
          <div className='h-36 inset-x-0 absolute top-0 shadow-inner bg-gradient-to-t from-transparent to-darkblue'></div>
          <div className='h-96 inset-x-0 absolute bottom-0 shadow-inner bg-gradient-to-b from-transparent to-darkblue'></div>
        </div>
      }
      <main className={`font-poppins relative bg-gradient-to-b from-darkblue to-footer ${widthPadding ? `${home ? 'pt-14' : 'pt-28'} ${widthPaddingX ? 'lg:px-6' : ''}` : ''}`}>
        <Header bgTransparent={!widthPadding} />
        <div className={widthPadding ? `max-w-8xl mx-auto ${widthPaddingX ? 'px-6 md:px-10' : ''}` : ''}>
          {children}
        </div>
      </main>
      <Footer />
    </>
  )
}