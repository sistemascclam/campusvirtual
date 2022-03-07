import { Fragment, useState } from 'react'
import Link from 'next/link'
import { signIn, signOut, useSession } from "next-auth/react"
import { Tab, Dialog, Disclosure, Menu, Transition, Popover } from '@headlessui/react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import useSWR from 'swr'

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

export default function NavBar() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)

  const closeMenu = () => {
    setOpen(!open)
  }

  const { data } = useSWR('/api/public/navigation', (...args) => fetch(...args).then(res => res.json()))

  return (
    <>
      <nav className={`dark:bg-darkblue bg-white py-1 transition-colors ease-in-out duration-300`}><Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setOpen}>
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
            <div className="relative max-w-xs w-full bg-white dark:bg-darkblue shadow-xl pb-12 flex flex-col overflow-y-auto">
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
                <button
                  type="button"
                  className="ml-2 p-2 rounded-xl text-gray-500 bg-gray-200 hover:text-blue-600 dark:text-gray-400 dark:bg-gray-700 hover:dark:text-white transition-all ease-in-out"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                  <span className="sr-only">Dark/Light</span>
                  {
                    theme == 'dark' ?
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                      :
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                  }
                </button>
              </div>
              {/* Links */}
              <Tab.Group as="div" className="mt-2">
                <div className="border-b border-gray-200">
                  <Tab.List className="-mb-px flex px-4 space-x-8">
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          selected ? 'text-blue-600 dark:text-white border-blue-600 dark:border-0' : 'text-gray-900  border-transparent',
                          'flex-1 whitespace-nowrap py-3 px-1 border-b-2 text-base font-medium'
                        )
                      }
                    >
                      Categorías
                    </Tab>
                  </Tab.List>
                </div>
                <Tab.Panels as={Fragment}>
                  <Tab.Panel className="pt-10 pb-8 px-4 space-y-10">
                    {data?.map((category, sec_k) => (
                      <div key={sec_k}>
                        <Disclosure defaultOpen={sec_k == 0}>
                          {({ open }) => (
                            <>
                              <Disclosure.Button id={`${category.id}-heading-mobile`} className="text-gray-800 dark:text-white font-semibold flex w-full justify-between">
                                <span>{category.name}</span>
                                {
                                  open ?
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                }
                              </Disclosure.Button>
                              <Disclosure.Panel>
                                <ul
                                  role="list"
                                  aria-labelledby={`${category.id}-${category.id}-heading-mobile`}
                                  className="mt-6 flex flex-col space-y-6"
                                >
                                  {category.sections.map((section) => (
                                    <li key={section.name} className="flow-root">
                                      <a href={section.keyword} className="-m-2 p-2 block text-gray-500 hover:text-blue-600 hover:dark:text-white">
                                        {section.name}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </Disclosure.Panel>
                            </>)}
                        </Disclosure>
                      </div>
                    ))}
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                <div className="flow-root">
                  <Link href="/inicio-sesion">
                    <a href="#" className="-m-2 p-2 block font-medium text-gray-900 dark:text-gray-100 hover:dark:text-white">
                      Ingresar
                    </a>
                  </Link>
                </div>
                <div className="flow-root">
                  <Link href="/registro">
                  <a href="#" className="-m-2 p-2 block font-medium text-gray-900 dark:text-gray-100 hover:dark:text-white">
                    Crear cuenta
                  </a>
                  </Link>
                </div>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
        <div className="w-full mx-auto px-2 sm:px-6 lg:px-10">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="dark:bg-darkblue p-2 rounded-full text-gray-700 dark:text-white hover:bg-blue-600 hover:text-white hover:dark:bg-blue-600 lg:hidden transition-all ease-in-out duration-300"
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
                  <a>
                    <img
                      className="block lg:hidden h-10 w-auto"
                      src="/images/cclamlogotipo.png"
                      alt="Logo"
                    />
                  </a>
                </Link>
                <Link href={"/"}>
                  <a>
                    <img
                      className="hidden lg:block h-10 w-auto"
                      src="/images/cclamlogotipo.png"
                      alt="Logo"
                    />
                  </a>
                </Link>
              </div>
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="h-full flex space-x-8">
                  <Popover className="flex">
                    {({ open }) => (
                      <>
                        <div className="relative flex">
                          <Popover.Button
                            className={classNames(
                              open
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent',
                              'text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:dark:border-blue-600 relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px'
                            )}
                          >
                            Categorías
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </Popover.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Popover.Panel className="absolute z-50 top-full inset-x-0 text-sm text-gray-300 mt-3">
                            <div className="absolute inset-0 top-1/2 bg-blue-600 dark:bg-darkblue shadow" aria-hidden="true" />
                            <div className="relative bg-blue-600 dark:bg-slate-800 rounded-md">
                              <div className="max-w-7xl mx-auto px-8 py-14">
                                <div className="row-start-1 grid grid-cols-6 gap-y-10 gap-x-8 text-sm">
                                  {data?.map((category, sec_k) => (
                                    <div key={sec_k}>
                                      <p id={`${category.name}-heading`} className="font-medium text-white cursor-default">
                                        {category.name}
                                      </p>
                                      <ul
                                        role="list"
                                        aria-labelledby={`${category.name}-heading`}
                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                      >
                                        {category.sections.map((item) => (
                                          <li key={item.name} className="flex">
                                            <a href={item.keyword} className="hover:text-blue-600">
                                              {item.name}
                                            </a>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                </div>
              </Popover.Group>
              {/* <div className="hidden sm:block sm:ml-6 my-auto">
                <div className="flex space-x-4">
                  <button
                    className={'text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:dark:text-white px-3 py-2 rounded-md text-sm'}
                  >
                    Categorias
                  </button>
                </div>
              </div> */}
              <div className="hidden sm:flex w-full justify-center ml-3">
                <label className="relative block mx-auto w-8/12 my-auto group">
                  <span className="sr-only">Buscar</span>
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-slate-400 " viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <input type="text"
                    placeholder={"Buscar en campus CCLAM"}
                    className="bg-white bg-opacity-95 rounded-full pl-12 w-full mx-auto py-2 border-1 border-gray-300 text-sm focus:ring-0 focus:border-blue-600 text-gray-700" />
                </label>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <OpcionesAuth />
              {/* <button
                type="button"
                className="hidden sm:block ml-2 p-2 rounded-xl text-gray-500 bg-gray-200 hover:text-blue-600 dark:text-gray-400 dark:bg-gray-900 hover:dark:text-white transition-all ease-in-out"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                <span className="sr-only">Dark/Light</span>
                {
                  theme == 'dark' ?
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                }
              </button> */}
              {/* Profile dropdown */}
              <OpcionesUsuarioAuth closeMenu={closeMenu} />
            </div>
          </div>
        </div>
      </nav>
    </>
  )
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
  <button
    type="button"
    title="Carrito de compras"
    className="hidden lg:block mx-1 p-1 rounded-full text-gray-400 dark:text-gray-400 hover:text-blue-600 hover:dark:text-white"
  >
    <span className="sr-only">Ver mi progreso</span>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path d="M12 14l9-5-9-5-9 5 9 5z" />
      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
    </svg>
  </button>
  <button
    type="button"
    title="Carrito de compras"
    className="hidden lg:block mx-1 p-1 rounded-full text-gray-400 dark:text-gray-400 hover:text-blue-600 hover:dark:text-white"
  >
    <span className="sr-only">Ver carrito de compra</span>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  </button>
  <button
    type="button"
    title="Lista de deseos"
    className="hidden lg:block mx-1 p-1 rounded-full text-gray-400 dark:text-gray-400 hover:text-blue-600 hover:dark:text-white"
  >
    <span className="sr-only">Ver lista de deseos</span>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  </button>
</>

const OpcionesNoAuth = () => <>
  <button
    type="button"
    title="Carrito de compras"
    className="hidden lg:block mx-1 p-1 rounded-full text-gray-400 dark:text-gray-400 hover:text-blue-600 hover:dark:text-white"
  >
    <span className="sr-only">Ver carrito de compra</span>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  </button>
  <button
    type="button"
    title="Lista de deseos"
    className="hidden lg:block mx-1 p-1 rounded-full text-gray-400 dark:text-gray-400 hover:text-blue-600 hover:dark:text-white"
  >
    <span className="sr-only">Ver lista de deseos</span>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  </button>
</>

const OpcionesUsuarioAuth = ({ closeMenu }) => {
  const { data: session } = useSession()
  return (<>
    {
      session ?
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
          <span className='w-8 h-8 flex justify-center items-center'>
          {
          session.user?.email?.substring(0, 1).toLocaleUpperCase()
          }
          </span>
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
            <Menu.Items static className={`text-center origin-top-right absolute right-0 mt-4 w-64 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}>
              <div className=" px-6 my-4">
                <p className="text-gray-600 font-medium text-sm leading-tight">Bienvenido a tu Campus CCLAM</p>
                <div className="flex text-gray-800 text-sm justify-between text-center mt-3">
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
                      <a className="text-blue-600 bg-blue-300 bg-opacity-30 px-4 py-2 text-xs rounded-3xl">
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