import { BrowserRouter, Navigate, Routes, Route, Outlet } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Register from './pages/register';
import Login from './pages/login';
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
  }
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
  const { ssoLogin } = useSelector(state => state.auth);

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
        </Route>
      </Routes>
    </BrowserRouter>
  )
};

export default App;