import axios from "axios"

export const get = async (url) => {
    let res = null
    let error = null

    try {
        const response = await axios.get(url)
        res = response
    } catch (e) {
        error = e.message
    }

    return { res, error }
}

export const post = async (url, body) => {
    let res = null
    let error = null

    try {
        const response = await axios.post(url, body)
        res = response
    } catch (err) {
        error = err
    }
    return { res, error }
}