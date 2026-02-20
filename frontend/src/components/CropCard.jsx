import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, MapPin, Loader2 } from 'lucide-react';
import { predictionService } from '../services/api';

const CropCard = ({ crop }) => {
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchPrediction = async () => {
            try {
                const res = await predictionService.getPrediction(crop.id);
                if (res.success) {
                    setPrediction(res.data);
                    // Mock chart data generation for visual representation
                    const data = [];
                    const currentPrice = res.data.currentPrice;
                    const predictedPrice = res.data.predictedPrice7Days;
                    const isUp = predictedPrice > currentPrice;

                    for (let i = 0; i < 7; i++) {
                        const variance = (Math.random() - 0.5) * (currentPrice * 0.02);
                        const trendProgress = (predictedPrice - currentPrice) * (i / 7);
                        data.push({
                            day: `Day ${i + 1}`,
                            price: Math.round(currentPrice + trendProgress + variance)
                        });
                    }
                    data.push({ day: 'Forecast', price: predictedPrice });
                    setChartData(data);
                }
            } catch (err) {
                console.error('Failed to fetch prediction', err);
            } finally {
                setLoading(false);
            }
        };

        if (crop && crop.id) {
            fetchPrediction();
        }
    }, [crop]);

    if (loading) {
        return (
            <div className="card" style={{ height: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--border)' }}>
                <Loader2 className="animate-spin text-primary" size={40} />
                <p style={{ marginTop: '1rem', color: 'var(--muted-foreground)' }}>Analyzing market trends...</p>
            </div>
        );
    }

    if (!prediction) return null;

    const isIncreasing = prediction.trend.includes('UP');

    return (
        <div className="card animate-fade-in" style={{ padding: '0', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', height: '200px' }}>
                <img
                    src={prediction.imageUrl || 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?q=80&w=500&auto=format&fit=crop'}
                    alt={prediction.cropName}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=500&auto=format&fit=crop'; }}
                />
                <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(4px)',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '2rem',
                    fontWeight: 700,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: isIncreasing ? '#059669' : '#dc2626'
                }}>
                    {isIncreasing ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                    <span>{prediction.trend}</span>
                </div>
            </div>

            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '1.25rem' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--foreground)', marginBottom: '0.25rem' }}>{prediction.cropName}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--muted-foreground)', fontSize: '0.9rem' }}>
                        <MapPin size={14} />
                        <span>{crop.region || 'Region Detect...'}</span>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ background: 'var(--muted)', padding: '1rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                        <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted-foreground)', marginBottom: '0.25rem' }}>Mandi Price</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 800 }}>₹{prediction.currentPrice}<span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--muted-foreground)' }}>/kg</span></p>
                    </div>
                    <div style={{
                        background: isIncreasing ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        padding: '1rem',
                        borderRadius: '1rem',
                        border: `1px solid ${isIncreasing ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`
                    }}>
                        <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: isIncreasing ? '#065f46' : '#991b1b', marginBottom: '0.25rem' }}>Forecast</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 800, color: isIncreasing ? '#065f46' : '#991b1b' }}>₹{prediction.predictedPrice7Days}<span style={{ fontSize: '0.9rem', fontWeight: 500 }}>/kg</span></p>
                    </div>
                </div>

                <div style={{ height: '160px', width: '100%', marginTop: 'auto' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                            <XAxis dataKey="day" hide />
                            <YAxis hide domain={['auto', 'auto']} />
                            <Tooltip
                                contentStyle={{
                                    borderRadius: '12px',
                                    border: 'none',
                                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                                    padding: '0.5rem 1rem'
                                }}
                                itemStyle={{ fontWeight: 700 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="price"
                                stroke={isIncreasing ? '#10b981' : '#ef4444'}
                                strokeWidth={4}
                                dot={{ fill: isIncreasing ? '#10b981' : '#ef4444', r: 0 }}
                                activeDot={{ r: 6, strokeWidth: 0 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <p style={{ fontSize: '0.7rem', textAlign: 'center', color: 'var(--muted-foreground)', marginTop: '0.5rem' }}>
                    * Predicted for next 7 days using AI analysis
                </p>
            </div>
        </div>
    );
};

export default CropCard;
