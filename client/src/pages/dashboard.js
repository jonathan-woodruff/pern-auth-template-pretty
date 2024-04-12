/* Dashboard page that the user sees upon authentication */
/* When the dashboard page loads, useEffect will check if the user is authenticated. If so, it will show the private information. If the user is not authenticated, it will log them out */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProtectedInfo, fetchProtectedInfoSSO, onLogout } from '../api/auth';
import Layout from '../components/layout';
import { unauthenticateUser, notSSO, assignUser } from '../redux/slices/authSlice';


const Dashboard = () => {
  const dispatch = useDispatch();
  const { ssoLogin } = useSelector(state => state.auth);
  const [loading, setLoading] = useState(true);
  const [protectedData, setProtectedData] = useState(null);

  const logout = async () => {
    try {
      await onLogout();
      dispatch(notSSO());
      dispatch(unauthenticateUser());
      dispatch(assignUser({ userEmail: null }));
      localStorage.removeItem('isAuth');
      localStorage.removeItem('userEmail');
    } catch(error) {
      console.log(error.response);
    }
  };

  const protectedInfo = async () => {
    try {
      const { data } = ssoLogin ? await fetchProtectedInfoSSO() : await fetchProtectedInfo();
      setProtectedData(data.info);
      setLoading(false);
    } catch(error) {
      logout(); //if the user isn't property authenticated using the token on the cookie or there is some other issue, this will force logout thus not allowing a user to gain unauthenticated access
    }
  };

  useEffect(() => {
    protectedInfo();
  }, []);

  return loading ? (
    <Layout>
      <h1>Loading...</h1>
    </Layout>
  ) : (
    <div>
      <Layout>
        <h1>Dashboard</h1>
        <h2>{ protectedData }</h2>
      </Layout>
    </div>
  )
  
};

export default Dashboard;