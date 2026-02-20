import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';
import { UserPlus, Mail, Lock, User, MapPin, Briefcase, AlertCircle } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'FARMER',
        landSize: '',
        annualIncome: '',
        state: '',
        district: '',
        location: '',
        contactNumber: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await authService.register(formData);
            if (response.success) {
                navigate('/login');
            } else {
                setError(response.message || 'Registration failed');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred during registration');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '550px', marginTop: '4rem' }}>
            <div className="card animate-fade-in">
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ background: 'var(--primary-light)', width: '4rem', height: '4rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: 'white' }}>
                        <UserPlus size={32} />
                    </div>
                    <h2>Join KrishiSetu</h2>
                    <p style={{ color: 'var(--muted-foreground)' }}>Empowering the future of Indian agriculture</p>
                </div>

                {error && (
                    <div style={{ padding: '0.75rem', backgroundColor: '#fee2e2', color: '#dc2626', borderRadius: 'var(--radius)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <AlertCircle size={18} />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="input-group">
                            <label htmlFor="name">Full Name</label>
                            <div style={{ position: 'relative' }}>
                                <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    style={{ paddingLeft: '2.75rem' }}
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="role">I am a...</label>
                            <div style={{ position: 'relative' }}>
                                <Briefcase size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />
                                <select
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    style={{ paddingLeft: '2.75rem' }}
                                    required
                                >
                                    <option value="FARMER">Farmer</option>
                                    <option value="BUYER">Buyer</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                style={{ paddingLeft: '2.75rem' }}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                style={{ paddingLeft: '2.75rem' }}
                                required
                            />
                        </div>
                    </div>

                    {formData.role === 'FARMER' ? (
                        <>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="input-group">
                                    <label htmlFor="landSize">Land Size (Acres)</label>
                                    <input
                                        id="landSize"
                                        name="landSize"
                                        type="number"
                                        step="0.01"
                                        placeholder="e.g. 5.5"
                                        value={formData.landSize}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="annualIncome">Annual Income (₹)</label>
                                    <input
                                        id="annualIncome"
                                        name="annualIncome"
                                        type="number"
                                        placeholder="e.g. 500000"
                                        value={formData.annualIncome}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="input-group">
                                    <label htmlFor="state">State</label>
                                    <input
                                        id="state"
                                        name="state"
                                        type="text"
                                        placeholder="e.g. Punjab"
                                        value={formData.state}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="district">District</label>
                                    <input
                                        id="district"
                                        name="district"
                                        type="text"
                                        placeholder="e.g. Amritsar"
                                        value={formData.district}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="input-group">
                            <label htmlFor="location">Company Location</label>
                            <div style={{ position: 'relative' }}>
                                <MapPin size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />
                                <input
                                    id="location"
                                    name="location"
                                    type="text"
                                    placeholder="e.g. Mumbai, Maharashtra"
                                    value={formData.location}
                                    onChange={handleChange}
                                    style={{ paddingLeft: '2.75rem' }}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', padding: '1rem' }}
                        disabled={loading}
                    >
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--muted-foreground)' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
