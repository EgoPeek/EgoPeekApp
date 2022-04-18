import axios from "axios"

const authHeader = window.localStorage.getItem('token_type') + " " + window.localStorage.getItem('token')

export const get = async (url) => {
    let res = null
    let error = null

    try {
        const response = await axios.get(url, {headers: {Authorization: authHeader}})
        res = response
    } catch (err) {
        error = err
    }

    return { res, error }
}

export const post = async (url, body) => {
    let res = null
    let error = null

    try {
        const response = await axios.post(url, body, {headers: {Authorization: authHeader}})
        res = response
    } catch (err) {
        error = err
    }
    return { res, error }
}