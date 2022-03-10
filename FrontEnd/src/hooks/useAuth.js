// import { useState, useEffect } from 'react'

const useAuth = () => {
    const auth = window.localStorage.getItem('auth')
    return auth === 'true'
}

export default useAuth