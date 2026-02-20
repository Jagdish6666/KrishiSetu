import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import FarmerDashboard from './FarmerDashboard';
import BuyerDashboard from './BuyerDashboard';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        if (!currentUser) {
            navigate('/login');
        } else {
            setUser(currentUser);
        }
    }, [navigate]);

    if (!user) return <div className="container">Loading...</div>;

    return (
        <>
            {user.role === 'FARMER' ? (
                <FarmerDashboard user={user} />
            ) : (
                <BuyerDashboard user={user} />
            )}
        </>
    );
};

export default Dashboard;
