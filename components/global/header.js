import { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import { signOut, useSession, signIn } from "next-auth/react"
import { Dialog, Disclosure, Menu, Transition, Popover } from '@headlessui/react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Image from 'next/image'

const navigation = {
  categories: [
    {
      id: 'categorias',
      name: 'Categorias',
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '#' },
            { name: 'Dresses', href: '#' },
            { name: 'Pants', href: '#' },
            { name: 'Denim', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Significant Other', href: '#' },
          ],
        },
        {
          id: 'clothing2',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '#' },
            { name: 'Dresses', href: '#' },
            { name: 'Pants', href: '#' },
            { name: 'Denim', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'accessories2',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' },
          ],
        },
        {
          id: 'brands2',
          name: 'Brands',
          items: [
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Significant Other', href: '#' },
          ],
        },
      ],
    },
  ]
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const fetcher = (...args) => fetch(...args).then(res => res.json())
export default function NavBar({ bgTransparent }) {
  const { data: session, status } = useSession()
  const [openMenuWeb, setOpenMenuWeb] = useState(false)
  const [open, setOpen] = useState(false)
  const [navTransparent, setnavTransparent] = useState(true)

  const closeMenu = () => {
    setOpen(!open)
  }

  const { data } = useSWR('/api/public/navigation', fetcher)


  useEffect(function onFirstMount() {
    function onScroll() {
      setnavTransparent(window.scrollY >= 20 ? false : true);
    }

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    }
  }, []);

  return (
    <>
      <nav className={`fixed top-0 ${navTransparent ? 'bg-transparent' : 'bg-darkblue'} lg:py-2 transition-all ease-in-out duration-500 inset-x-0 z-2000`}>
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 flex z-2000 lg:hidden" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative max-w-xs w-full bg-darkblue shadow-xl pb-12 flex flex-col overflow-y-auto">
                <div className="px-4 pt-3 pb-2 flex justify-between">
                  <button
                    type="button"
                    className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                    onClick={closeMenu}
                  >
                    <span className="sr-only">Close menu</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div className="mt-2">
                  <div className="pt-3 pb-8 px-4 space-y-10">
                    <label className="relative block mx-auto my-auto group">
                      <input type="text"
                        placeholder={"Buscar en campus CCLAM"}
                        className="bg-slate-900 bg-opacity-95 rounded-xl pr-12 w-full mx-auto py-2 text-sm border-2 ring-0 border-slate-900 focus:text-base focus:border-gray-900 text-gray-400" />
                      <span className="sr-only">Buscar</span>
                      <button className="absolute inset-y-0 right-0 flex items-center px-2 rounded-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-slate-400 " viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </label>
                    <div>
                      <Disclosure defaultOpen={true}>
                        <span className='text-gray-400 text-sm'>Especialidades</span>
                        <Disclosure.Panel>
                          <ul
                            role="list"
                            aria-labelledby={`especialidades-heading-mobile`}
                            className="mt-6 flex flex-col space-y-6"
                          >
                            {data?.map((category, sec_k) => (
                              <li key={category.name} className="flow-root">
                                <a href={`#${category.slug}`} className="-m-2 p-2 block text-white">
                                  {category.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </Disclosure.Panel>
                      </Disclosure>
                    </div>
                  </div>
                </div>
                <div className="py-6 px-4 space-y-6">
                  <button className="flex text-lg bg-red-700 w-max py-1 px-3 rounded-xl text-white ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                    <span>
                      Lives
                    </span>
                  </button>
                </div>
                <div className="border-t border-1 border-slate-800 py-6 px-4 space-y-6">
                  <div className="flow-root">
                    <Link href="/inicio-sesion">
                      <a href="#" className="-m-2 p-2 block text-gray-400 hover:text-white">
                        Ingresar
                      </a>
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link href="/registro">
                      <a href="#" className="-m-2 p-2 block text-gray-400 hover:text-white">
                        Crear cuenta
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>
        <div className="w-full mx-auto px-2 sm:px-6 lg:px-6">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="bg-darkblue p-2 rounded-full text-white hover:bg-blue-600 lg:hidden transition-all ease-in-out duration-300"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Abrir menu responsive</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center  justify-center rounded-full">
                <Link href={"/"}>
                  <a className="block lg:hidden h-10 w-auto">
                    <Image
                      src="/images/cclamlogotipo.png"
                      alt="Logo"
                      width={61.141}
                      height={44}
                    />
                  </a>
                </Link>
                <Link href={"/"}>
                  <a className='hidden lg:flex items-center justify-center'>
                    <Image
                      src="/images/cclamlogotipo.png"
                      alt="Logo"
                      width={61.141}
                      height={44}
                    />
                  </a>
                </Link>
              </div>
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="h-full flex space-x-8">
                  <Popover className="flex">
                    <>
                      <div className="relative flex">
                        <Popover.Button
                          onMouseEnter={() => setOpenMenuWeb(true)}
                          onMouseLeave={() => setOpenMenuWeb(false)}
                          open={openMenuWeb}
                          className={classNames(
                            openMenuWeb
                              ? 'border-blue-600'
                              : 'border-transparent',
                            'text-gray-300 hover:border-blue-600 relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px'
                          )}
                        >
                          Contenido
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </Popover.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        show={openMenuWeb}
                        enter="transition ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Popover.Panel
                          onMouseEnter={() => setOpenMenuWeb(true)}
                          onMouseLeave={() => setOpenMenuWeb(false)}
                          static={true} className="absolute z-2000 top-full max-w-sm inset-x-0 mx-14 text-sm text-gray-400">
                          <div className="absolute inset-0 top-1/2" aria-hidden="true" />
                          <div className="relative bg-slate-800 mt-3 rounded-xl shadow-xl transition-none">
                            <div className="mx-auto px-8 py-8 row-start-1 grid grid-cols-1 gap-y-6 gap-x-10 text-sm">
                              <div>
                                <p id={`especialidades-heading`} className="font-medium text-md cursor-default">
                                  Especialidades
                                </p>
                                <ul
                                  role="list"
                                  aria-labelledby={`especialidades-heading`}
                                  className="mt-6 space-y-6 sm:mt-4 sm:space-y-2"
                                >
                                  {data?.map((category, sec_k) => (
                                    <li key={sec_k} className="flex">
                                      <a href={`#${category.slug}`} className="text-white hover:text-blue-600 cursor-pointer text-lg transition-all duration-200 ease-in-out">
                                        {category.name}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <button className="flex text-lg bg-red-700 w-max py-1 px-3 rounded-xl text-white mt-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                                </svg>
                                <span>
                                  Lives
                                </span>
                              </button>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  </Popover>
                </div>
              </Popover.Group>
              <SearchButton />
            </div>
            <div className={`absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ${!session && status === 'loading' ? 'opacity-0' : 'opacity-100'} transition-all ease-out`}>
              <OpcionesAuth />
              {/* Profile dropdown */}
              <OpcionesUsuarioAuth closeMenu={closeMenu} />
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

const SearchButton = () => {
  const [search, setsearch] = useState(null)
  return (
    <div className="hidden sm:flex w-full justify-center ml-3 ">
      <label className="relative block mx-auto w-8/12 my-auto group">
        <span className="sr-only">Buscar</span>
        <span className="absolute inset-y-0 left-0 flex items-center pl-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-slate-400 " viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </span>
        <input type="text"
          onChange={(e) => setsearch(e.target.value)}
          value={search ? search : ""}
          placeholder={"Buscar en campus CCLAM"}
          className={`bg-slate-900 bg-opacity-95 pl-12 w-full mx-auto py-2 ${search ? 'text-base rounded-t-xl focus:ring-0 border-b-0 border-x-1 border-t-1 border-blue-700' : 'text-sm rounded-xl border-slate-900 border-2 focus:border-gray-900'} ring-0 focus:text-base text-gray-400`}
        />
        {
          search && search.length >= 2 ?
            <SearchItems search={search} setsearch={setsearch} /> : ""
        }
      </label>
    </div>
  )
}

function SearchItems({ search, setsearch }) {
  const router = useRouter()
  const { data } = useSWR(`/api/public/search?search=${search}`, fetcher);

  if (!search) {
    return null
  }

  const handleSelectedCourse = (ruta) => {
    setsearch(null)
    router.push(`/curso/${ruta}`)
  }

  return <div className='absolute top-10 inset-x-0 rounded-b-xl bg-slate-900 text-white border-x-1 border-b-1 border-blue-700 px-3 py-1 max-h-screen	 overflow-y-auto'>
    {
      !data || data?.length == 0 ?
        <p className='opacity-70 italic'>No se encontraron resultados</p> : ""
    }
    {data?.map((item) =>
      <div key={item.id} onClick={() => handleSelectedCourse(item.ruta)} className="mb-1 flex flex-col hover:bg-slate-800 rounded-xl p-3 cursor-pointer">
        <span className={`text-xs bg-blue-700 rounded-xl p-1 w-max font-semibold mt-1`}>
          {item.category.name}
        </span>
        <p className='text-lg my-1'>{item.title}</p>
        <p className='text-sm flex'><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
          {item.name}</p>
      </div>
    )}
  </div>
}

const OpcionesAuth = () => {
  const { data: session } = useSession()
  return (<>
    {
      session ?
        <OpcionesSiAuth />
        :
        <OpcionesNoAuth />
    }
  </>)
}

const OpcionesSiAuth = () => <>
  <Link href="/progress">
  <button
    type="button"
    title="Mi progreso"
    className="hidden lg:block mx-1 p-1 rounded-full text-gray-400 hover:text-white"
  >
    <span className="sr-only">Ver mi progreso</span>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path d="M12 14l9-5-9-5-9 5 9 5z" />
      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
    </svg>
  </button>
  </Link>

  <Link href="/carrito">
  <button
    type="button"
    title="Carrito de compras"
    className="hidden lg:block mx-1 p-1 rounded-full text-gray-400 hover:text-white"
  >
    <span className="sr-only">Ver carrito de compra</span>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  </button>
  </Link>

  <Link href="/favoritos">
    <button
      type="button"
      title="Lista de deseos"
      className="hidden lg:block mx-1 p-1 rounded-full text-gray-400 hover:text-white"
    >
      <span className="sr-only">Ver lista de deseos</span>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </button>
  </Link>
</>

const OpcionesNoAuth = () => <>
  <Link href="/carrito">
  <button
    type="button"
    title="Carrito de compras"
    className="hidden lg:block mx-1 p-1 rounded-full text-gray-400 hover:text-white"
  >
    <span className="sr-only">Ver carrito de compra</span>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  </button>
  </Link>

  <Link href="/favoritos">
  <button
    type="button"
    title="Lista de deseos"
    className="hidden lg:block mx-1 p-1 rounded-full text-gray-400 hover:text-white"
  >
    <span className="sr-only">Ver lista de deseos</span>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  </button>
  </Link>

</>

const OpcionesUsuarioAuth = ({ closeMenu }) => {
  const { data: session, status } = useSession()
  return (<>
    {
      status != 'loading' && session ?
        <OpcionesUsuarioSiAuth />
        :
        <OpcionesUsuarioNoAuth closeMenu={closeMenu} />
    }
  </>)
}
const OpcionesUsuarioSiAuth = () => {
  const { data: session } = useSession()

  return (
    <Menu as="div" className="ml-3 relative">
      <div>
        <Menu.Button className="bg-blue-600 flex text-sm rounded-full hover:bg-blue-700">
          <span className="sr-only">Abrir menu de usuario</span>
          {
            session.user && session.user.image ?
              <Image
                className='rounded-full'
                width={32}
                height={32}
                src={session.user.image} alt="user profile pic"
              /> :
              <span className='w-8 h-8 flex justify-center items-center text-white font-bold'>
                {
                  session.user?.email?.substring(0, 1).toLocaleUpperCase()
                }
              </span>
          }
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className={`text-center origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}>
          <div className="text-left w-full text-xs font-medium text-gray-500 cursor-default px-4 flex py-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span className='text-ellipsis overflow-hidden'>
              {
                session.user?.name ?? session.user?.email
              }
            </span>
          </div>
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                onClick={() => signOut()}
                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
              >
                Cerrar sesión
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

const OpcionesUsuarioNoAuth = ({ closeMenu }) => {
  const router = useRouter()

  const handlLogin = (e) => {
    e.preventDefault()
    closeMenu()
    // router.push("/inicio-sesion")
  }

  const handleRegister = (e) => {
    e.preventDefault()
    closeMenu()
    // router.push("/registro")
  }

  return (
    <Menu as="div" className="ml-3 relative">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="bg-blue-600 p-1 flex text-sm rounded-full hover:bg-blue-700">
              <span className="sr-only">Abrir menu de usuario</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            show={open}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items static className={`text-center origin-top-right absolute right-0 mt-4 w-64 rounded-md py-1 bg-slate-800 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none`}>
              <div className=" px-6 my-4">
                <p className="text-gray-200 font-medium text-sm leading-tight">Bienvenido a tu Campus CCLAM</p>
                <div className="flex text-gray-200 text-sm justify-between text-center mt-3">
                  <Menu.Item>
                    <Link
                      href="/registro">
                      <a className="bg-blue-600 text-white px-4 py-2 text-xs rounded-3xl">
                        Regístrate
                      </a>
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link
                      href="/inicio-sesion">
                      <a className="text-blue-600 bg-gray-200 font-medium px-4 py-2 text-xs rounded-3xl">
                        Inicia Sesión
                      </a>
                    </Link>
                  </Menu.Item>
                </div>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}