import { useState, useEffect } from 'react';
import { buyerService } from '../services/api';
import { Search, ShoppingBag, MapPin, Tag, ArrowRight } from 'lucide-react';

const BuyerDashboard = ({ user }) => {
    const [crops, setCrops] = useState([]);
    const [myOffers, setMyOffers] = useState([]);
    const [searchLocation, setSearchLocation] = useState('');
    const [isPlacingOffer, setIsPlacingOffer] = useState(null);
    const [offerPrice, setOfferPrice] = useState('');

    useEffect(() => {
        fetchCrops();
        fetchMyOffers();
    }, []);

    const fetchCrops = async (loc = '') => {
        try {
            const res = await buyerService.getAllCrops(loc);
            setCrops(res.data || []);
        } catch (err) {
            console.error('Failed to fetch crops', err);
        }
    };

    const fetchMyOffers = async () => {
        try {
            const res = await buyerService.getMyOffers();
            setMyOffers(res.data || []);
        } catch (err) {
            console.error('Failed to fetch offers', err);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchCrops(searchLocation);
    };

    const handlePlaceOffer = async (e) => {
        e.preventDefault();
        try {
            await buyerService.placeOffer({
                cropId: isPlacingOffer.id,
                offerPrice: parseFloat(offerPrice)
            });
            setIsPlacingOffer(null);
            setOfferPrice('');
            fetchMyOffers();
            alert('Offer placed successfully!');
        } catch (err) {
            alert('Failed to place offer');
        }
    };

    return (
        <div className="container animate-fade-in">
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem' }}>Welcome, {user.name}</h1>
                <p style={{ color: 'var(--muted-foreground)' }}>Browse available crops and make offers</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <section>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <ShoppingBag className="text-primary" />
                            <h2 style={{ fontSize: '1.5rem' }}>Available Crops</h2>
                        </div>

                        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem' }}>
                            <input
                                type="text"
                                placeholder="Search by location..."
                                value={searchLocation}
                                onChange={(e) => setSearchLocation(e.target.value)}
                                style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}
                            />
                            <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                                <Search size={18} />
                            </button>
                        </form>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        {crops.length === 0 ? (
                            <div className="card" style={{ gridColumn: 'span 2', textAlign: 'center', padding: '3rem' }}>
                                <p>No crops available at the moment.</p>
                            </div>
                        ) : (
                            crops.map(crop => (
                                <div key={crop.id} className="card">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                        <h3 style={{ color: 'var(--primary)' }}>{crop.name}</h3>
                                        <span style={{ fontWeight: 700 }}>₹{crop.price}/kg</span>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--muted-foreground)' }}>
                                            <MapPin size={16} />
                                            <span>{crop.location}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--muted-foreground)' }}>
                                            <ShoppingBag size={16} />
                                            <span>Stored: {crop.quantity} kg</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--muted-foreground)' }}>
                                            <Tag size={16} />
                                            <span>Farmer: {crop.farmer?.name}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsPlacingOffer(crop)}
                                        className="btn btn-primary"
                                        style={{ width: '100%' }}
                                    >
                                        Make Offer
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </section>

                <aside>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <ArrowRight className="text-secondary" />
                        <h2 style={{ fontSize: '1.5rem' }}>My Offers</h2>
                    </div>
                    <div className="card">
                        {myOffers.length === 0 ? (
                            <p style={{ textAlign: 'center', color: 'var(--muted-foreground)' }}>You haven't made any offers yet.</p>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {myOffers.map(offer => (
                                    <div key={offer.id} style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                            <strong>{offer.crop?.name}</strong>
                                            <span style={{
                                                fontSize: '0.75rem',
                                                padding: '0.1rem 0.5rem',
                                                borderRadius: '1rem',
                                                backgroundColor: offer.status === 'PENDING' ? '#fef3c7' : '#d1fae5',
                                                color: offer.status === 'PENDING' ? '#92400e' : '#065f46'
                                            }}>
                                                {offer.status}
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                            <span style={{ color: 'var(--muted-foreground)' }}>Your offer: ₹{offer.offerPrice}</span>
                                            <span style={{ color: 'var(--muted-foreground)' }}>Asking: ₹{offer.crop?.price}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </aside>
            </div>

            {isPlacingOffer && (
                <div className="modal-overlay" style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 2000
                }}>
                    <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '400px' }}>
                        <h3>Make Offer for {isPlacingOffer.name}</h3>
                        <p style={{ margin: '1rem 0', color: 'var(--muted-foreground)' }}>
                            Current price: <strong>₹{isPlacingOffer.price}/kg</strong>
                        </p>
                        <form onSubmit={handlePlaceOffer}>
                            <div className="input-group">
                                <label>Your Offer Price (per kg)</label>
                                <input
                                    type="number"
                                    value={offerPrice}
                                    onChange={(e) => setOfferPrice(e.target.value)}
                                    required
                                    placeholder="e.g. 20"
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Submit Offer</button>
                                <button type="button" onClick={() => setIsPlacingOffer(null)} className="btn" style={{ flex: 1, backgroundColor: 'var(--muted)' }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BuyerDashboard;
