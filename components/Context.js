import React from 'react'
import AppContext from 'components/AppContext';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Context({ children }) {
    const { data: session, status } = useSession()
    const [localStorageData, setlocalStorageData] = useState({
        fav: [],
        cart: []
    })

    useEffect(() => {
        setlocalStorageData({
            fav: JSON.parse(localStorage.getItem("arrayDataFav")),
            cart: JSON.parse(localStorage.getItem("arrayDataCart")),
        })
    }, [])

    useEffect(() => {
        if(status != 'loading' && session){
            setlocalStorageData({
                fav: [],
                cart: [],
            })
            localStorage.removeItem("arrayDataFav");
            localStorage.removeItem("arrayDataCart");
        }
    }, [session,status])
    return (
        <AppContext.Provider
            value={{
                state: {
                    localStorageData,
                },
                setlocalStorageData: setlocalStorageData,
            }}>
            {children}
        </AppContext.Provider>
    )
}
