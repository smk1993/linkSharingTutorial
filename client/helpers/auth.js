import cookie from 'js-cookie';
import Router from 'next/router';

// set cookie
export const setCookie=(key, value) => {
    // to check if accessed from client side
    if(process.browser) {
        cookie.set(key, value, {
            expires: 1
        })
    }
}
// remove from cookie
export const removeCookie=(key, value) => {
    // to check if accessed from client side
    if(process.browser) {
        cookie.remove(key)
    }
}
// get from cookie such as stored token

// will be usefull when we need to make request to server with auth token
export const getCookie = key => {
    if(process.browser) {
        return cookie.get('token');
    }
}
// set in local storage
export const setLocalStorage = (key,value) => {
    if(process.browser) {
        localStorage.setItem(key,JSON.stringify(value));
    }
}
// remove from localstorage
export const removeLocalStorage = (key) => {
    if(process.browser) {
        localStorage.removeItem(key);
    }
}
// authenticate user by passing data to cookie and localstorage during sign in
export const authenticate = (response, next) => {
setCookie('token', response.data.token);
setLocalStorage('user', response.data.user);
next()
}
// access user info from localstorage
export const isAuth = ( ) => {
    if(process.browser) {
        const cookieChecked = getCookie('token');
        if(cookieChecked) {
            if(localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'))
            } else {
                return false
            }
        }
    }
}

export const logout = () => {
    removeCookie('token');
    removeLocalStorage('user');
    Router.push('/login');
}