import { Outlet, useNavigate } from 'react-router'
import { NavLink } from 'react-router-dom'

import { useState } from 'react'

import { userService } from '../services/user/user.service'
import { login, signup } from '../store/actions/user.actions'
import { ImgUploader } from './ImgUploader'

export function LoginSignup() {
    return (
        <div className="login-page">
            <div className="page-container">
                <nav className="auth-tabs">
                    <NavLink to="login">Login</NavLink>
                    <NavLink to="signup">Signup</NavLink>
                </nav>
                <div className="auth-content">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export function Login() {
    const [credentials, setCredentials] = useState({ username: '', password: '' })

    const navigate = useNavigate()

    async function onLogin(ev = null) {
        if (ev) ev.preventDefault()

        if (!credentials.username || !credentials.password) return
        await login(credentials)
        navigate('/')
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }
    
    return (
        <form className="login-form" onSubmit={onLogin}>
            <input
                type="text"
                name="username"
                value={credentials.username}
                placeholder="Username"
                onChange={handleChange}
                required
                autoFocus
            />
            <input
                type="password"
                name="password"
                value={credentials.password}
                placeholder="Password"
                onChange={handleChange}
                required
            />
            <button>Login</button>
        </form>
    )
}

export function Signup() {
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
    const navigate = useNavigate()

    function clearState() {
        setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
    }

    function handleChange(ev) {
        const type = ev.target.type

        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }
    
    async function onSignup(ev = null) {
        if (ev) ev.preventDefault()

        if (!credentials.username || !credentials.password || !credentials.fullname) return
        await signup(credentials)
        clearState()
        navigate('/')
    }

    function onUploaded(imgUrl) {
        setCredentials({ ...credentials, imgUrl })
    }

    return (
        <form className="signup-form" onSubmit={onSignup}>
            <input
                type="text"
                name="fullname"
                value={credentials.fullname}
                placeholder="Fullname"
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="username"
                value={credentials.username}
                placeholder="Username"
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                value={credentials.password}
                placeholder="Password"
                onChange={handleChange}
                required
            />
            <ImgUploader onUploaded={onUploaded} />
            <button>Signup</button>
        </form>
    )
}