import axios from "axios"

export const get = async (url) => {
    const headers = {headers: {Authorization: window.localStorage.getItem('token_type') + " " + window.localStorage.getItem('token')}}
    let res = null
    let error = null

    try {
        const response = await axios.get(url, headers)
        res = response
    } catch (err) {
        error = err
    }

    return { res, error }
}

export const post = async (url, body) => {
    const headers = {headers: {Authorization: window.localStorage.getItem('token_type') + " " + window.localStorage.getItem('token')}}
    let res = null
    let error = null

    try {
        const response = await axios.post(url, body, headers)
        res = response
    } catch (err) {
        error = err
    }
    return { res, error }
}