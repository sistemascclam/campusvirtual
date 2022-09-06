import Head from "next/head"

import { getCsrfToken, getSession, useSession, signOut } from "next-auth/react"
import Layout, { siteTitle } from "@global/layout"
import React, { useState } from "react"
import axios from '@util/Api'
import { promiseToast } from "@util/helper"
import { useEffect } from "react"
import { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"

export default function Perfil({ csrfToken }) {
  const [tabactivo, setTabactivo] = useState(0);
  const { data: session, status } = useSession();
  const [formInfoPersonal, setformInfoPersonal] = useState(null)

  useEffect(() => {
    loadInformacionPersonal()
  }, [])


  const loadInformacionPersonal = async () => {
    const perfilData = await axios.get(`/api/perfil`)
    const { data } = perfilData
    setformInfoPersonal(data)
  }

  const handleSubmitInformacionPersonal = (e) => {
    e.preventDefault()
    promiseToast(axios.post(`/api/perfil`, formInfoPersonal), loadInformacionPersonal, null, 'Perfil actualizado')
  }

  const handleChangeInput = (e) => {
    setformInfoPersonal({
      ...formInfoPersonal,
      [e.target.id]: e.target.value
    })
  }

  const [errorEliminarCuenta, seterrorEliminarCuenta] = useState(false)

  const [correo_eliminar_cuenta, setcorreo_eliminar_cuenta] = useState("")

  const handleChangeCorreoEliminarCuenta = (e) => {
    seterrorEliminarCuenta(false)
    setcorreo_eliminar_cuenta(e.target.value)
  }

  const handleDeleteAccount = (e) => {
    e.preventDefault()
    if (correo_eliminar_cuenta === session.user.email) {
      openModal()
    } else {
      seterrorEliminarCuenta(true)
    }
  }

  const deleteAccountAction = () => {
    console.log("ish");
    promiseToast(axios.post(`/api/delete_cclam_account`, {correo_eliminar_cuenta}), () => signOut(), null, null,'No se pudo eliminar la cuenta')
    // promiseToast(axios.post(`/api/delete_cclam_account`, {correo_eliminar_cuenta}), () => signOut(), null, 'Cuenta eliminada')
  }

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <Layout>
      <Head>
        <title> perfil de usuario | {siteTitle}</title>
      </Head>
      <div className="min-h-screen py-4">
        <div className="flex flex-col items-center content-center bg-blue-600 rounded-3xl w-full md:w-7/12 py-6 mx-auto">
          <div className="text-white text-center font-extrabold text-xl mb-2">
            {status !== "loading" && session ?
              <div>
                <span className="text-center ">
                  Hola, {session.user?.name ?? session.user?.email}
                </span>
              </div>
              : ""
            }
          </div>
          <div className="text-white text-center">
            Bienvenido a tu cuenta, aqui puedes administrar tu<p></p>
            informacion personal o eliminar tu cuenta.
          </div>
        </div>

        <ul className="w-full md:w-7/12 mx-auto text-white flex justify-around mt-10">
          <li
            onClick={() => setTabactivo(0)}
            className={`cursor-pointer border-b-[3px] ${tabactivo == 0 ? 'border-blue-600' : 'border-transparent hover:border-blue-600'} font-extrabold`}
          >
            <span className="hidden md:block">
              Informacion basica
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 block md:hidden">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
            </svg>
          </li>
          <li
            onClick={() => setTabactivo(2)}
            className={`cursor-pointer border-b-[3px] ${tabactivo == 2 ? 'border-blue-600' : 'border-transparent hover:border-blue-600'} font-extrabold`}
          >
            <span className="hidden md:block">
              Eliminar cuenta
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 block md:hidden">
              <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
            </svg>
          </li>
        </ul>
        <div className=" text-white w-full md:w-9/12 mx-auto pt-6">
          <div id="content1" className={`${tabactivo === 0 ? "" : "hidden"} duration-300 ease-in-out transition-all`}>
            <form className="flex flex-col gap-4" onSubmit={handleSubmitInformacionPersonal}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full md:w-8/12">
                <div>
                  <label className="block text-slate-400 text-base mb-2" >
                    Tipo de documento
                  </label>
                  <select required value={formInfoPersonal?.tipoDoc} id="tipoDoc" onChange={handleChangeInput} className="shadow bg-slate-900 appearance-none rounded-xl w-full text-base py-3 px-3 text-white leading-tight border-2 border-slate-800">
                    <option value="">--Seleccione--</option>
                    <option value="1">DNI</option>
                    <option value="2">Carnet de extranjería</option>
                    <option value="3">Pasaporte</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 text-base mb-2" >
                    Documento
                  </label>
                  <input required type="text" value={formInfoPersonal?.documento} onChange={handleChangeInput} id="documento" className="shadow bg-slate-900 appearance-none rounded-xl w-full text-base py-3 px-3 text-white leading-tight border-2 border-slate-800" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 text-base mb-2" >
                    Nombres
                  </label>
                  <input required type="text" value={formInfoPersonal?.nombres} onChange={handleChangeInput} id="nombres" className="shadow bg-slate-900 appearance-none rounded-xl w-full text-base py-3 px-3 text-white leading-tight border-2 border-slate-800" />
                </div>
                <div>
                  <label className="block text-slate-400 text-base mb-2" >
                    Apellido paterno
                  </label>
                  <input required type="text" value={formInfoPersonal?.paterno} onChange={handleChangeInput} id="paterno" className="shadow bg-slate-900 appearance-none rounded-xl w-full text-base py-3 px-3 text-white leading-tight border-2 border-slate-800" />
                </div>
                <div>
                  <label className="block text-slate-400 text-base mb-2" >
                    Apellido materno
                  </label>
                  <input required type="text" value={formInfoPersonal?.materno} onChange={handleChangeInput} id="materno" className="shadow bg-slate-900 appearance-none rounded-xl w-full text-base py-3 px-3 text-white leading-tight border-2 border-slate-800" />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 text-base mb-2" >
                  Profesión/Actividad
                </label>
                <input required type="text" value={formInfoPersonal?.profesion} onChange={handleChangeInput} id="profesion" className="shadow bg-slate-900 appearance-none rounded-xl w-full text-base py-3 px-3 text-white leading-tight border-2 border-slate-800" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 text-base mb-2" >
                    Dirección
                  </label>
                  <input required type="text" value={formInfoPersonal?.direccion} onChange={handleChangeInput} id="direccion" className="shadow bg-slate-900 appearance-none rounded-xl w-full text-base py-3 px-3 text-white leading-tight border-2 border-slate-800" />
                </div>
                <div>
                  <label className="block text-slate-400 text-base mb-2" >
                    Correo
                  </label>
                  <input readOnly type="text" id="correo" disabled value={session?.user?.email} className="shadow bg-slate-900 appearance-none rounded-xl w-full text-base py-3 px-3 text-gray-500 select-none leading-tight border-2 border-slate-800" />
                </div>
              </div>
              <button className="text-white bg-blue-600 hover:bg-blue-700 rounded-3xl w-36  md:w-48 h-10 mt-2 mx-auto">
                Guardar
              </button>
            </form>
          </div>
          <div id="content2" className={`${tabactivo === 1 ? "" : "hidden"} duration-300 ease-in-out transition-all`}>
            <form className="flex flex-col gap-4 items-center">
              <PasswordComponent
                nam="Contraseña actual"
                id="password_actual"
              />
              <div className="text-white text-center w-full md:w-96">
                Su nueva Contraseña debe ser de minimo{" "}
                <span className="font-extrabold">8 caracteres</span>,
                contener almenos{" "}
                <span className="font-extrabold">
                  una minuscula una mayuscula y un numero.
                </span>
              </div>
              <PasswordComponent
                nam="Nueva contraseña"
                id="new_password"
              />
              <PasswordComponent
                nam="Confirmar nueva contraseña"
                id="confirm_new_password"
              />
              <button className="text-white bg-blue-600 hover:bg-blue-700 rounded-3xl w-36  md:w-48 h-10 mt-2 mx-auto">
                Guardar
              </button>
            </form>
          </div>
          <div id="content3" className={`${tabactivo === 2 ? "" : "hidden"} duration-300 ease-in-out transition-all`}>
            <form className="flex flex-col gap-4 items-center" onSubmit={handleDeleteAccount}>
              <div className="text-white text-center py-3 md:px-1 px-1 w-full md:w-96">
                Si elimina su cuenta,{" "}
                <span className="text-red-800 font-bold">
                  toda su data sera eliminada
                </span>{" "}
                de
                nuestro servidor y no podra tener acseso a sus cursos
                nunca mas.
              </div>
              <div className="w-80 md:w-96">
                <label className="block text-slate-400 text-base mb-2" >
                  Escriba su correo
                </label>
                <input required type="email" id="correo_elimininar_cuenta" onChange={handleChangeCorreoEliminarCuenta} className="shadow bg-slate-900 appearance-none rounded-xl w-full text-base py-3 px-3 text-white leading-tight border-2 border-slate-800" />
              </div>
              {
                errorEliminarCuenta && <span className="text-red-600">El correo no coincide con el del usuario</span>
              }
              <button className="text-white bg-blue-600 hover:bg-blue-700 rounded-3xl w-36  md:w-48 h-10 mt-2 mx-auto">
                Eliminar Cuenta
              </button>
            </form>
          </div>
        </div>
      </div>
      <ModalEliminarCuenta isOpen={isOpen} closeModal={closeModal} callback={deleteAccountAction} />
    </Layout>
  );
}

const PasswordComponent = ({ name, id }) => {
  const [typeInput, settypeInput] = useState("password")
  return (
    <div className="w-80 md:w-96">
      <label className="block text-slate-400 text-base mb-2" >
        {name}
      </label>
      <div className="relative">
        <input required type={typeInput} id={id} className="shadow bg-slate-900 appearance-none rounded-xl w-full text-base py-3 pl-3 pr-10 text-white leading-tight border-2 border-slate-800" />
        <button onClick={() => settypeInput(typeInput == "password" ? "text" : "password")} type="button" className="absolute inset-y-0 z-10 right-4">
          {
            typeInput === 'password' ?
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg> :
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z" clipRule="evenodd" />
                <path d="M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z" />
              </svg>
          }
        </button>
      </div>
    </div>
  )
}

const ModalEliminarCuenta = ({ isOpen, closeModal, callback }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-80" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  ¿Seguro de eliminar cuenta?
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Toda su data será eliminada y no podrá recuper sus avances, cursos y transacciones registradas en la plataforma.
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    onClick={callback}
                  >
                    Sí, eliminar cuenta definitivamente
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
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
