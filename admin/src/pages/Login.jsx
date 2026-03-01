/**
 * @file Login.jsx
 * @description Admin login page that verifies the API key against the server.
 *
 * On successful verification the key is persisted into AuthContext and
 * the user is redirected to the dashboard.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { verifyToken } from '../services/api';

const Login = () => {
    const [key, setKey] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (key.trim()) {
            setLoading(true);
            try {
                await verifyToken(key);
                login(key);
                navigate('/');
            } catch (err) {
                console.error("Login verification failed", err);
                setError('Invalid API Key. Please try again.');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-base-200">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center mb-4">Admin Access</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">API Key</span>
                            </label>
                            <input 
                                type="password" 
                                placeholder="Enter Admin Key" 
                                className="input input-bordered w-full max-w-xs" 
                                value={key}
                                onChange={(e) => setKey(e.target.value)}
                            />
                        </div>
                        {error && <p className="text-error text-sm mt-2 text-center">{error}</p>}
                        <div className="card-actions justify-center mt-6">
                            <button className="btn btn-primary w-full" disabled={loading}>
                                {loading ? <span className="loading loading-spinner"></span> : 'Login'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
