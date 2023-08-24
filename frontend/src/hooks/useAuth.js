import api from "../utils/api";

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useFlashMessage from './useFlashMessage'

export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false)
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()
    const [user, setUser] = useState({})

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            api.defaults.headers.Atuthorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)


            api.get('/users/checkUser', {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            }).then((response) => {
                setUser(response.data)
            })
        }
    }, [])

    async function authUser(data) {
        setAuthenticated(true)

        localStorage.setItem('token', JSON.stringify(data.token))


    }

    async function register(user) {

        let mstText = 'Cadastro realizado Com Sucesso !'
        let msgType = 'success'

        try {
            const data = await api.post('/users/register', user).then((response) => {
                return response.data
            })

            await authUser(data)
        } catch (error) {
            mstText = error.response.data.message
            msgType = 'error'
        }

        setFlashMessage(mstText, msgType)
    }

    async function login(user) {

        let msgText = 'Login realisado com suceso!'
        let msgType = 'success'

        try {
            const data = await api.post('/users/login', user).then((response) => {
                return response.data
            })

            await authUser(data)
        } catch (error) {
            msgText = error.response.data.message
            msgType = 'error'
        }

        setFlashMessage(msgText, msgType)
    }

    function logout() {
        const msgText = 'Logout realisado com suceso!'
        const msgType = 'success'

        setAuthenticated(false)
        localStorage.removeItem('token')
        api.defaults.headers.Atuthorization = undefined
        navigate('/')

        setFlashMessage(msgText, msgType)
    }

    return { authenticated, register, logout, login, user }
}