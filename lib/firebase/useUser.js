import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { initFirebase } from 'lib/firebase/initFirebase'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {
    removeUserCookie,
    setUserCookie,
    getUserFromCookie,
} from 'lib/firebase/userCookies'
import { mapUserData } from 'lib/firebase/mapUserData'
import autherrors from "../../public/jsons/autherrors.json"

initFirebase()

const useUser = () => {
    const [user, setUser] = useState()
    const [error, setError] = useState(null)
    const router = useRouter()
    const auth = getAuth()

    const logout = async () => {
        try {
            await auth.signOut();
            removeUserCookie();
            router.push("/inicio-sesion");
        } catch (e) {
            console.log(e.message);
        }
    }

    const register = async (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('register',userCredential)
                // Signed in
                const user = userCredential.user;
                const userData = mapUserData(user)
                console.log(userData)
                setUserCookie(userData)
                setUser(userData)
                router.push("/");
            })
            .catch((errorrsp) => {
                let errortmp=autherrors.find(e=>e.code==errorrsp.code)
                setError(errortmp && errortmp.message ? errortmp.message : "¡Ha ocurrido un error, por favor vuelve a intentarlo!")
                console.log("register",errorrsp)
            });
        // const response = await createUserWithEmailAndPassword(email, password);
        // const token = await response.user.getIdToken(); // getIdToken is a method of user
        // console.log('THIS IS THE RESPONSE', response);
        // console.log('THIS IS THE RESPONSE', token);
    }

    const signin = async (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('signin',userCredential)
                // Signed in
                const user = userCredential.user;
                const userData = mapUserData(user)
                setUserCookie(userData)
                setUser(userData)
                router.push("/");
            })
            .catch((errorrsp) => {
                let errortmp=autherrors.find(e=>e.code==errorrsp.code)
                setError(errortmp && errortmp.message ? errortmp.message : "¡Ha ocurrido un error, por favor vuelve a intentarlo!")
                console.log("signin",errorrsp)
            });
        // const response = await createUserWithEmailAndPassword(email, password);
        // const token = await response.user.getIdToken(); // getIdToken is a method of user
        // console.log('THIS IS THE RESPONSE', response);
        // console.log('THIS IS THE RESPONSE', token);
    }

    const resetError=()=>{
        setError(false)
    }

    useEffect(() => {
        // Firebase updates the id token every hour, this
        // makes sure the react state and the cookie are
        // both kept up to date
        const cancelAuthListener = auth.onIdTokenChanged((user) => {
            if (user) {
                const userData = mapUserData(user)
                setUserCookie(userData)
                setUser(userData)
            } else {
                removeUserCookie()
                setUser()
            }
        })

        const userFromCookie = getUserFromCookie()

        if (!userFromCookie && (router.pathname != "/inicio-sesion" && router.pathname != "/registro")) {
            router.push('/')
            return
        }
        setUser(userFromCookie)

        return () => {
            cancelAuthListener()
        }
    }, [])

    return { user, logout, register, signin, error,resetError }
}

export { useUser }