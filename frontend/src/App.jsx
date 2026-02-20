import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Leaf, LogIn, UserPlus, LayoutDashboard, Search, Home, Menu, X, Bell, LogOut } from 'lucide-react'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import { authService } from './services/api'

const LandingPage = () => (
    <div className="animate-fade-in">
        <section className="hero" style={{ padding: '8rem 0', textAlign: 'center', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white', borderRadius: '0 0 3rem 3rem' }}>
            <div className="container">
                <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>Empowering Farmers, <br />Transparency for Buyers</h1>
                <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', opacity: 0.9, maxWidth: '800px', margin: '0 auto 2.5rem' }}>
                    KrishiSetu is India's leading platform connecting rural farmers directly with bulk buyers,
                    ensuring fair pricing and supply chain transparency.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Link to="/register" className="btn" style={{ backgroundColor: 'white', color: 'var(--primary)', padding: '1rem 2rem' }}>Get Started</Link>
                    <Link to="/login" className="btn" style={{ border: '2px solid white', color: 'white', padding: '1rem 2rem' }}>Log In</Link>
                </div>
            </div>
        </section>

        <section style={{ padding: '5rem 0' }}>
            <div className="container">
                <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>Why Choose KrishiSetu?</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <div className="card">
                        <div style={{ background: 'var(--primary-light)', width: '3rem', height: '3rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: 'white' }}>
                            <Leaf size={24} />
                        </div>
                        <h3>Direct Sourcing</h3>
                        <p>Skip the middlemen and connect directly with verified farmers across the country.</p>
                    </div>
                    <div className="card" style={{ borderTop: '4px solid var(--accent)' }}>
                        <div style={{ background: 'var(--accent)', width: '3rem', height: '3rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: 'white' }}>
                            <Search size={24} />
                        </div>
                        <h3>Real-time Tracking</h3>
                        <p>Track your supply chain from seed to store with our integrated dashboard.</p>
                    </div>
                    <div className="card" style={{ borderTop: '4px solid var(--secondary)' }}>
                        <div style={{ background: 'var(--secondary)', width: '3rem', height: '3rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: 'white' }}>
                            <Bell size={24} />
                        </div>
                        <h3>Scheme Eligibility</h3>
                        <p>Farmers can instantly check eligibility for various government schemes and subsidies.</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
)

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false)
    const [user, setUser] = useState(authService.getCurrentUser())
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setUser(authService.getCurrentUser())
    }, [location])

    const handleLogout = () => {
        authService.logout()
        setUser(null)
        navigate('/')
    }

    return (
        <nav className={`glass ${scrolled ? 'scrolled' : ''}`} style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
            padding: scrolled ? '0.75rem 0' : '1.5rem 0',
            transition: 'all 0.3s ease',
            borderBottom: '1px solid var(--border)'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 800, fontSize: '1.5rem' }}>
                    <Leaf size={32} />
                    <span>KrishiSetu</span>
                </Link>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <Link to="/" className="nav-link" style={{ fontWeight: 500 }}>Home</Link>
                    {user ? (
                        <>
                            <Link to="/dashboard" className="nav-link" style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <LayoutDashboard size={18} />
                                Dashboard
                            </Link>
                            <button onClick={handleLogout} className="btn btn-primary" style={{ padding: '0.5rem 1rem', background: '#ef4444' }}>
                                <LogOut size={18} />
                                <span>Logout</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link" style={{ fontWeight: 500 }}>Login</Link>
                            <Link to="/register" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem' }}>Join Now</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

function App() {
    return (
        <div className="app">
            <Navbar />
            <main style={{ paddingTop: '5.5rem', minHeight: '100vh' }}>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </main>
            <footer style={{ padding: '4rem 0', background: 'var(--card)', borderTop: '1px solid var(--border)', marginTop: '4rem' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 800, fontSize: '1.25rem', marginBottom: '1rem' }}>
                        <Leaf size={24} />
                        <span>KrishiSetu</span>
                    </div>
                    <p style={{ color: 'var(--muted-foreground)' }}>© 2026 KrishiSetu - Rural Sourcing & Transparency Platform.</p>
                </div>
            </footer>
        </div>
    )
}

export default App
