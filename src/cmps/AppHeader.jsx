import { UserMsg } from './UserMsg.jsx'
// import { LoginSignup } from './LoginSignup.jsx'
// import { userService } from '../services/user.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
// import { logout } from '../store/actions/user.actions.js'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

// const { NavLink } = ReactRouterDOM
// const { useSelector, useDispatch } = ReactRedux

export function AppHeader() {
    const dispatch = useDispatch()
    // const user = useSelector(storeState => storeState.userModule.loggedInUser)
    // console.log('user:', user)

    async function onLogout() {
        try {
            await logout()
            showSuccessMsg('logout successfully')
        } catch (err) {
            showErrorMsg('OOPs try again')
        }
    }


    // function onToggleToyt(ev) {
    //     ev.preventDefault()
    //     dispatch({ type: TOGGLE_TOYT_IS_SHOWN })
    // }

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Toy App</h1>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/toy" >Toys</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>


                </nav>
            </section>

            <UserMsg />
        </header>
    )
}
