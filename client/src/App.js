import { BrowserRouter, Navigate, Routes, Route, Outlet } from 'react-router-dom';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Register from './pages/register';
import Login from './pages/login';
import { useEffect, useState } from 'react';
//import RequestReset from './pages/requestReset';
import { useSelector, useDispatch } from 'react-redux';
import { onSSOSuccess } from './api/auth';
import { sso, assignUser } from './redux/slices/authSlice';

const PrivateRoutes =  () => {
  const dispatch = useDispatch();
  const { isAuth, ssoLogin } = useSelector(state => state.auth);

  //check if the user successfully authenticated with sso
  if (!isAuth && !ssoLogin) {
    const getUser = () => {
      onSSOSuccess().then(response => {
        if(response.status === 200) {
          dispatch(sso());
          return response;
        }
        throw new Error('authentication failed');
      })
      .then(responseObject => {
        dispatch(assignUser({ user_email: responseObject.data.user.emails[0].value }));
      })
      .catch(error => {
        console.log(error);
      });
    };
    getUser();
    /*try {
      console.log('hi');
      const response = onSSOSuccess();
      console.log(response);
      if (response.status === 200) {
        dispatch(sso());
        setSSOLogged(true);
        const payload = { user_email: response.data.user.emails[0].value };
        dispatch(assignUser(payload));
      }
    } catch(error) {
      console.log(error);
    }*/
  }
  console.log('sso status: ' + ssoLogin);
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
  /*
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
  */

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