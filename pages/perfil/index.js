import Head from "next/head";
import Link from "next/link";

import { signIn, getCsrfToken, getSession, useSession } from "next-auth/react";
import Layout, { siteTitle } from "@global/layout";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { getAuthError } from "util/helper";
import { Tab } from "@headlessui/react";

export default function Perfil({ csrfToken }) {
  const [Tabactivo, setTabactivo] = useState(0);
  const { data: session, status } = useSession();

  return (
    <Layout widthPadding={false}>
      <Head>
        <title> perfil de usuario | {siteTitle}</title>
      </Head>

      <div className="flex md:min-h-screen min-h-screen">
        <div className=" flex flex-col items-center content-center bg-indigo-600 left-14 md:left-72 w-96 md:w-2/4 px-5 md:px-10 rigth-10 h-32 md:h-40 rounded-3xl relative top-16 md:top-20">
          <div className="text-white py-1 md:py-4 px-1 md:px-4 text-center font-extrabold text-x md:text-xl relative top-1 md:top-5">
            {status !== "loading" && session ? (
              <div>
                <span className="text-center ">
                  Hola, {session.user?.name ?? session.user?.email}
                </span>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="text-white py-1 md:py-2 px-1 md:px-6 text-center">
            Bienvenido a tu cuenta, aqui puedes administrar tu<p></p>
            informacion personal, de facturacion o eliminar tu cuenta.
          </div>
        </div>

        <div className="tab-Container">
          <div className="flex">
            <label
              onClick={() => setTabactivo(0)}
              className="text-white py-1 md:py-2 px-1 md:px-5 cursor-pointer no-underline hover:underline hover:decoration-blue-600 hover:decoration-2 font-extrabold absolute top-48 md:top-60 left-16 md:left-20 "
            >
              Informacion basica
            </label>
            <label
              onClick={() => setTabactivo(1)}
              className="text-white cursor-pointer py-1 px-1 md:py-4 md:px-5 font-extrabold no-underline hover:underline hover:decoration-blue-600 hover:decoration-2 rounded-xl absolute top-52 md:top-60 right-80 md:right-1/2 "
            >
              {" "}
              Contraseña
            </label>
            <label
              onClick={() => setTabactivo(2)}
              className=" text-white cursor-pointer py-0.5 px-1 md:py-2 md:px-5 font-extrabold no-underline hover:underline hover:decoration-blue-600 hover:decoration-2  rounded-xl absolute top-56 md:top-60 right-72 md:right-32 "
            >
              Eliminar cuenta
            </label>
          </div>

          <div className=" content text-white">
            <div id="content1" className={`${Tabactivo === 0 ? "" : "hidden"}`}>
              <form className=" w-3/4 md:w-3/4 h-96 md:h-80 absolute top-64 md:top-80 left-14 md:left-36 text-black ">
                <div className="px-1 py-0.5 md:px-2 md:py-2 space-y-1 md:space-x-3">
                  <input
                    type="text"
                    className=" py-2 md:py-5 border-black rounded-xl  w-80 h-8 md:w-80 md:h-8 bg-black text-white "
                    name="Tipo Doc*:"
                    placeholder="Tipo Doc*:"
                  ></input>
                  <input
                    type="text"
                    className="py-2 md:py-5 border-black rounded-xl w-80 h-8 md:w-80 md:h-8 bg-black text-white"
                    name="Doc.Identidad*:"
                    placeholder="Doc.Identidad*:"
                  ></input>
                </div>

                <div className="px-1 py-1 space-y-1 md:px-2 md:py-3 md:space-x-3">
                  <input
                    type="text"
                    name="Nombres*:"
                    placeholder="Nombres*:"
                    className="py-2 md:py-5 border-black rounded-xl w-80 h-8 bg-black text-white"
                  ></input>

                  <input
                    type="text"
                    name="Apellido Paterno*:"
                    placeholder="Apellido Paterno*:"
                    className="py-2 md:py-5 border-black rounded-xl w-80 h-8 bg-black text-white"
                  ></input>
                  <input
                    type="text"
                    name="Apellido Materno*:"
                    placeholder="Apellido Materno*:"
                    className="py-2 md:py-5 border-black rounded-xl w-80 h-8 bg-black text-white"
                  ></input>
                </div>
                <div className="px-1 py-1 space-y-1">
                  <input
                    type="text"
                    placeholder="Direccion*:"
                    name="Direccion*:"
                    className="px-2 py-2 md:py-5 border-black rounded-xl w-2/3 h-8 bg-black text-white"
                  ></input>
                  <input
                    type="text"
                    name="Correo*:"
                    placeholder="Correo*:"
                    className="py-2 md:py-5 border-black rounded-xl w-72 h-8 bg-black text-white"
                  ></input>
                </div>
                <div className="px-1 py-2 space-y-1">
                  <input
                    type="text"
                    name="Profesion/Actividad:"
                    placeholder="Profesion/Actividad:"
                    className="py-2 md:py-5 border-black rounded-xl w-2/3 h-8 bg-black text-white"
                  ></input>
                </div>

                <button className="  text-white bg-blue-700 rounded-3xl w-36 h-10 md:w-44 md:h-10 relative left-28 md:left-96 ">
                  Guardar
                </button>
              </form>
            </div>

            <div id="content2" className={Tabactivo === 1 ? "" : "hidden"}>
              <form className="  w-96 h-96 md:w-3/4 md:h-80 absolute top-64 left-12 md:top-72 md:left-28 text-white">
                <div className="px-2 py-2 md:px-36 md:py-2 relative left-5 md:left-36">
                  <input
                    type="text"
                    name="Contraseña actual*:"
                    placeholder="Contraseña actual*:"
                    className="py-5 md:py-5 border-black rounded-xl w-80 h-8 md:w-2/3 md:h-8 bg-black text-white"
                  ></input>
                </div>
                <div className="text-white text-center py-1 md:py-3 px-0.4 md:px-6">
                  Su nueva Contraseña debe ser de minimo{" "}
                  <a className="font-extrabold">8 caracteres</a>,<br></br>
                  contener almenos{" "}
                  <a className="font-extrabold">
                    una minuscula una mayuscula y un <br></br>numero.
                  </a>
                </div>
                <div className=" px-2 py-1 md:px-36 md:py-2 relative left-5 md:left-36">
                  <input
                    type="text"
                    name="Nueva Contraseña*:"
                    placeholder="Nueva Contraseña*:"
                    className="py-5 md:py-5 border-black rounded-xl w-80 h-8 md:w-2/3 md:h-8 bg-black text-white"
                  ></input>
                </div>
                <div className=" px-2 py-2 md:px-36 md:py-3 relative left-5 md:left-36">
                  <input
                    type="text"
                    name="Confirma nueva Contraseña*:"
                    placeholder="Confirma nueva Contraseña*:"
                    className="py-5 md:py-5 border-black rounded-xl w-80 h-8 md:w-2/3 md:h-8 bg-black text-white"
                  ></input>
                </div>
                <button className="  text-white bg-blue-700 rounded-3xl w-36  md:w-48 h-10 absolute right-32 md:right-96 ">
                  Guardar
                </button>
              </form>
            </div>

            <div id="content3" className={Tabactivo === 2 ? "" : "hidden"}>
              <form className="w-96 h-80 md:w-3/4 md:h-80 absolute top-72 md:top-80 left-10 md:left-32">
                <div className="text-white text-center py-3 md:px-1 px-1 text-white">
                  Si elimina su cuenta,
                  <a className="text-red-500 font-bold">
                    toda su data sera eliminada
                  </a>{" "}
                  de<br></br>
                  nuestro servidor y no podra tener acseso a sus cursos
                  <br></br>nunca mas.
                </div>
                <div className="  px-3 md:px-36 py-2 items-center relative left-5 md:left-32 top-3">
                  <input
                    type="text"
                    name="Confirma nueva Contraseña*:"
                    placeholder="Confirma nueva Contraseña*:"
                    className="py-5 md:py-5 border-black rounded-xl w-80 h-8 md:w-2/3 md:h-8 bg-black text-white"
                  ></input>
                </div>
                <button className=" text-white bg-blue-700 rounded-3xl w-56 h-10 relative left-20 top-10 md:left-96 md:top-10">
                  Eliminar Cuenta
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
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
