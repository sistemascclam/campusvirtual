import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { initFirebase } from 'lib/firebase/initFirebase'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
    removeUserCookie,
    setUserCookie,
    getUserFromCookie,
} from 'lib/firebase/userCookies'
import { mapUserData } from 'lib/firebase/mapUserData'

initFirebase()

const useUser = () => {
    const [user, setUser] = useState()
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

    const signin = async (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                const userData = mapUserData(user)
                setUserCookie(userData)
                setUser(userData)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
        // const response = await createUserWithEmailAndPassword(email, password);
        // const token = await response.user.getIdToken(); // getIdToken is a method of user
        // console.log('THIS IS THE RESPONSE', response);
        // console.log('THIS IS THE RESPONSE', token);
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

    return { user, logout, signin }
}

export { useUser }