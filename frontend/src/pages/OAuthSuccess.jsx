import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import qs from 'qs';

const OAuthSuccess = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = qs.parse(location.search, { ignoreQueryPrefix: true });

    if (query.token) {
      const userData = {
        _id: query.id, 
        name: query.name,
        email: query.email,
        token: query.token,
        role: query.role
      };

      login(userData);
      navigate('/');

    } else {
      navigate('/login');
    }
  }, [location, login, navigate]);

  return null;
};

export default OAuthSuccess;
