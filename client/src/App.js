import { BrowserRouter, Navigate, Routes, Route, Outlet } from 'react-router-dom';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Register from './pages/register';
import Login from './pages/login';
import { useEffect, useState } from 'react';
//import RequestReset from './pages/requestReset';
import { useSelector, useDispatch } from 'react-redux';
import { onSSOSuccess } from './api/auth';
import { setSSO } from './redux/slices/authSlice';

const PrivateRoutes = () => {
  const { isAuth, ssoLogin } = useSelector(state => state.auth);
  return (
    <>
      { isAuth || ssoLogin ? <Outlet /> : <Navigate to='/login'/> }
    </>
  );
};

const RestrictedRoutes = () => {
  const { isAuth, ssoLogin } = useSelector(state => state.auth);
  return (
    <>
      { !(isAuth || ssoLogin) ? <Outlet /> : <Navigate to='/dashboard'/> }
    </>
  );
};


const App = () => {
  const [user, setUser] = useState(null);
  const { ssoLogin } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = () => {
        onSSOSuccess().then(response => {
          if(response.status === 200) {
            dispatch(setSSO());
            return response;
          }
          throw new Error('authentication failed');
        })
        .then(responseObject => {
          setUser(responseObject.data.user);
        })
        .catch(error => {
          console.log(error);
        });
    };
    getUser();
  }, []);

  console.log(user);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={ <PrivateRoutes /> } >
          <Route path='/dashboard' element={ <Dashboard ssoLogin={ssoLogin} /> } />
        </Route>

        <Route element={ <RestrictedRoutes /> } >
          <Route path='/register' element={ <Register /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/' element={ <Login /> } />
          {/*<Route path='/request-reset' element={ <RequestReset /> } />*/}
        </Route>
      </Routes>
    </BrowserRouter>
  )
};

export default App;