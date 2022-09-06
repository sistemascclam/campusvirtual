import { promiseToast } from "@util/helper";
import axios from '@util/Api';

export const actionFavorites = async (idCurso, add, session, status,callback,localStorageData,setlocalStorageData) => {
    if (session && status != 'loading') {
        promiseToast(axios.post(`/api/favorites/${idCurso}?action=${add ? 'add' : 'remove'}`), () =>  callback(), add ? '❤️' : '💔​')
    } else {
        let list = localStorageData?.fav ?? [],
            tmpnewlist = [];
        if (list?.some(lc => lc.idCurso == idCurso)) {
            tmpnewlist = list.filter(lc => lc.idCurso != idCurso)
        } else {
            tmpnewlist = list.concat({ idCurso: idCurso, active: true })
        }
        setlocalStorageData({
            ...localStorageData,
            fav: tmpnewlist
        })
        localStorage.setItem("arrayDataFav", JSON.stringify(tmpnewlist))
    }
}


export const actionShopingCart = async (idCurso, add, session, status,callback,localStorageData,setlocalStorageData) => {
    if (session && status != 'loading') {
        promiseToast(axios.post(`/api/shopingcart/${idCurso}?action=${add ? 'add' : 'remove'}`), () => callback() ,'🛒​')
    } else {
        let list = localStorageData?.cart ?? [],
            tmpnewlist = [];
        if (list?.some(lc => lc.idCurso == idCurso)) {
            tmpnewlist = list.filter(lc => lc.idCurso != idCurso)
        } else {
            tmpnewlist = list.concat({ idCurso: idCurso, active: true })
        }
        setlocalStorageData({
            ...localStorageData,
            cart: tmpnewlist
        })
        localStorage.setItem("arrayDataCart", JSON.stringify(tmpnewlist))
    }
}