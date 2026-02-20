import { useState, useEffect } from 'react';
import { farmerService } from '../services/api';
import { Plus, Package, CheckCircle, Search, TrendingUp, User } from 'lucide-react';

const FarmerDashboard = ({ user }) => {
    const [crops, setCrops] = useState([]);
    const [offers, setOffers] = useState([]);
    const [isAddingCrop, setIsAddingCrop] = useState(false);
    const [newCrop, setNewCrop] = useState({ name: '', quantity: '', price: '', location: '', description: '' });
    const [eligibilityData, setEligibilityData] = useState({ landSize: '', state: '', annualIncome: '' });
    const [eligibleSchemes, setEligibleSchemes] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const cropsRes = await farmerService.getCrops();
            setCrops(cropsRes.data || []);
            const offersRes = await farmerService.getOffers();
            setOffers(offersRes.data || []);
        } catch (err) {
            console.error('Failed to fetch data', err);
        }
    };

    const handleAddCrop = async (e) => {
        e.preventDefault();
        try {
            await farmerService.addCrop(newCrop);
            setIsAddingCrop(false);
            setNewCrop({ name: '', quantity: '', price: '', location: user.location, description: '' });
            fetchData();
        } catch (err) {
            alert('Failed to add crop');
        }
    };

    const checkEligibility = async (e) => {
        e.preventDefault();
        try {
            const res = await farmerService.checkEligibility(eligibilityData);
            setEligibleSchemes(res.data || []);
        } catch (err) {
            alert('Failed to check eligibility');
        }
    };

    return (
        <div className="container animate-fade-in">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem' }}>Welcome, {user.name}</h1>
                    <p style={{ color: 'var(--muted-foreground)' }}>Manage your crops and check government schemes</p>
                </div>
                <button onClick={() => setIsAddingCrop(true)} className="btn btn-primary">
                    <Plus size={18} />
                    <span>Add New Crop</span>
                </button>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <section>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <Package className="text-primary" />
                        <h2 h2 style={{ fontSize: '1.5rem' }}>Your Crops</h2>
                    </div>

                    {crops.length === 0 ? (
                        <div className="card" style={{ textAlign: 'center', color: 'var(--muted-foreground)', padding: '3rem' }}>
                            <Package size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                            <p>You haven't added any crops yet.</p>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            {crops.map(crop => (
                                <div key={crop.id} className="card">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <h3 style={{ fontSize: '1.25rem' }}>{crop.name}</h3>
                                        <span style={{ color: 'var(--primary)', fontWeight: 700 }}>₹{crop.price}/kg</span>
                                    </div>
                                    <p style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem' }}>Quantity: {crop.quantity} kg</p>
                                    <p style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem' }}>Location: {crop.location}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '3rem 0 1.5rem' }}>
                        <TrendingUp className="text-primary" />
                        <h2 style={{ fontSize: '1.5rem' }}>Recent Offers</h2>
                    </div>

                    <div className="card">
                        {offers.length === 0 ? (
                            <p style={{ textAlign: 'center', color: 'var(--muted-foreground)' }}>No offers yet.</p>
                        ) : (
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
                                        <th style={{ padding: '1rem 0' }}>Crop</th>
                                        <th>Buyer</th>
                                        <th>Offer Price</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {offers.map(offer => (
                                        <tr key={offer.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                            <td style={{ padding: '1rem 0' }}>{offer.crop?.name}</td>
                                            <td>{offer.buyer?.name}</td>
                                            <td style={{ fontWeight: 600 }}>₹{offer.offerPrice}</td>
                                            <td>
                                                <span style={{
                                                    padding: '0.25rem 0.75rem',
                                                    borderRadius: '1rem',
                                                    fontSize: '0.8rem',
                                                    backgroundColor: offer.status === 'PENDING' ? '#fef3c7' : '#d1fae5',
                                                    color: offer.status === 'PENDING' ? '#92400e' : '#065f46'
                                                }}>
                                                    {offer.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </section>

                <aside>
                    <div className="card glass" style={{ backgroundColor: 'var(--card)', position: 'sticky', top: '7rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                            <Search className="text-secondary" />
                            <h3>Scheme Eligibility</h3>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)', marginBottom: '1.5rem' }}>
                            Check which government schemes you qualify for based on your details.
                        </p>

                        <form onSubmit={checkEligibility}>
                            <div className="input-group">
                                <label>Land Size (Acres)</label>
                                <input
                                    type="number"
                                    value={eligibilityData.landSize}
                                    onChange={(e) => setEligibilityData({ ...eligibilityData, landSize: e.target.value })}
                                    placeholder="e.g. 5"
                                />
                            </div>
                            <div className="input-group">
                                <label>Annual Income (₹)</label>
                                <input
                                    type="number"
                                    value={eligibilityData.annualIncome}
                                    onChange={(e) => setEligibilityData({ ...eligibilityData, annualIncome: e.target.value })}
                                    placeholder="e.g. 50000"
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label>State</label>
                                <input
                                    type="text"
                                    value={eligibilityData.state}
                                    onChange={(e) => setEligibilityData({ ...eligibilityData, state: e.target.value })}
                                    placeholder="e.g. Punjab"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-secondary" style={{ width: '100%' }}>Check Now</button>
                        </form>

                        {eligibleSchemes.length > 0 && (
                            <div style={{ marginTop: '2rem' }}>
                                <h4 style={{ marginBottom: '1rem' }}>Eligible Schemes:</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {eligibleSchemes.map(scheme => (
                                        <div key={scheme.id} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                                            <CheckCircle size={18} color="var(--primary)" style={{ marginTop: '0.2rem' }} />
                                            <div>
                                                <strong style={{ fontSize: '0.9rem' }}>{scheme.name}</strong>
                                                <p style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>{scheme.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </aside>
            </div>

            {isAddingCrop && (
                <div className="modal-overlay" style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 2000
                }}>
                    <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '500px' }}>
                        <h3>Add New Crop</h3>
                        <form onSubmit={handleAddCrop} style={{ marginTop: '1.5rem' }}>
                            <div className="input-group">
                                <label>Crop Name</label>
                                <input value={newCrop.name} onChange={(e) => setNewCrop({ ...newCrop, name: e.target.value })} required placeholder="e.g. Wheat" />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="input-group">
                                    <label>Quantity (kg)</label>
                                    <input type="number" value={newCrop.quantity} onChange={(e) => setNewCrop({ ...newCrop, quantity: e.target.value })} required />
                                </div>
                                <div className="input-group">
                                    <label>Price per kg (₹)</label>
                                    <input type="number" value={newCrop.price} onChange={(e) => setNewCrop({ ...newCrop, price: e.target.value })} required />
                                </div>
                            </div>
                            <div className="input-group">
                                <label>Location</label>
                                <input value={newCrop.location} onChange={(e) => setNewCrop({ ...newCrop, location: e.target.value })} required />
                            </div>
                            <div className="input-group">
                                <label>Description</label>
                                <textarea value={newCrop.description} onChange={(e) => setNewCrop({ ...newCrop, description: e.target.value })} rows="3"></textarea>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Add Crop</button>
                                <button type="button" onClick={() => setIsAddingCrop(false)} className="btn" style={{ flex: 1, backgroundColor: 'var(--muted)' }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FarmerDashboard;
