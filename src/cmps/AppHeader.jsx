import { UserMsg } from './UserMsg.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../store/actions/user.actions.js'
import { Trans, useTranslation } from 'react-i18next'
import '../services/i18.js'
import { useState } from 'react'

export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()
    const { t, i18n } = useTranslation()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    async function onLogout() {
        try {
            await logout()
            navigate('/')
            showSuccessMsg(`Bye now`)
            setIsMobileMenuOpen(false)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    function toggleMobileMenu() {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    function closeMobileMenu() {
        setIsMobileMenuOpen(false)
    }

    const lngs = {
        en: { nativeName: 'English' },
        es: { nativeName: 'Spanish' },
    }

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <div className="header-brand">
                    <h1>React Toy App</h1>
                </div>
                
                {/* Mobile Menu Toggle */}
                <button 
                    className="mobile-menu-toggle"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle mobile menu"
                >
                    <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </button>

                <nav className={`app-nav ${isMobileMenuOpen ? 'show' : ''}`}>
                    <div className="nav-links">
                        <NavLink to="/" onClick={closeMobileMenu}>Home</NavLink>
                        <NavLink to="/about" onClick={closeMobileMenu}>About</NavLink>
                        <NavLink to="/toy" onClick={closeMobileMenu}>Toys</NavLink>
                        <NavLink to="/dashboard" onClick={closeMobileMenu}>Dashboard</NavLink>
                        {user?.isAdmin && <NavLink to="/admin" onClick={closeMobileMenu}>Admin</NavLink>}
                    </div>
                    
                    <div className="nav-actions">
                        {!user && <NavLink to="auth/login" className="login-link" onClick={closeMobileMenu}>Login</NavLink>}
                        {user && (
                            <div className="user-info">
                                <Link to={`user/${user._id}`} onClick={closeMobileMenu}>
                                    {user.imgUrl && <img src={user.imgUrl} alt={user.fullname} />}
                                    <span className="user-name">{user.fullname}</span>
                                </Link>
                                <span className="score">{user.score?.toLocaleString()}</span>
                                <button onClick={onLogout} className="logout-btn">Logout</button>
                            </div>
                        )}
                        
                        <div className="i18-wrapper">
                            <Trans i18nKey="i18"></Trans>
                            {Object.keys(lngs).map(lng => (
                                <button
                                    key={lng}
                                    className="btn btn-lang"
                                    onClick={() => i18n.changeLanguage(lng)}
                                    disabled={i18n.resolvedLanguage === lng}
                                >
                                    {lngs[lng].nativeName}
                                </button>
                            ))}
                        </div>
                    </div>
                </nav>
            </section>

            <UserMsg />
        </header>
    )
}
