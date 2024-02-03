import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token === null) {
      navigate('/login');
      toast.error('Please login');
    }
  }, [token, navigate]);

  return token !== null ? children : null;
};

export default PrivateRoute;
