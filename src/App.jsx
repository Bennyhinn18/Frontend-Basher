import React,{useState,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Leaderboard from './components/Leaderboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProfilePage from './components/ProfilePage';
import Dashboard from './pages/Dashboard';
import HistoryPage from './components/HistoryPage';
import PrivateRoute from './components/PrivateRoute';
import { GoogleOAuthProvider } from '@react-oauth/google';
import NotFoundPage from './components/NotFoundPage';

const clientId = '196864594092-h4rt5tkfcb18b8424gk3h3l5qf39obg5.apps.googleusercontent.com';

const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 1000); // adjust the time as needed
        return () => clearTimeout(timer);
    }, [location]);

    return isLoading && <div id="preloader"><i>.</i><i>.</i><i>.</i></div>;
};

const App = () => {
    return (
        <GoogleOAuthProvider clientId={clientId}>
            <Router>
                <Preloader />
                <Navbar />
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/profile/:username" element={<ProfilePage/>} />
                    <Route path="/leaderboard" element={<PrivateRoute><Leaderboard /></PrivateRoute>} />
                    <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
                    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="/history" element={<PrivateRoute><HistoryPage /></PrivateRoute>} />
                    <Route path='*' element={<NotFoundPage />} />
                </Routes>
                <Footer />
            </Router>
        </GoogleOAuthProvider>
    );
};

export default App;