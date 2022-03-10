import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import '../../../hooks/useAuth'
import useAuth from '../../../hooks/useAuth'

const ProtectedRoute = ({children}) => {
    const auth = useAuth()

    return auth.isAuthenticated() ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoute