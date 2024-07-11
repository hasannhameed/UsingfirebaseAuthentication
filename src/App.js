import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { useContext } from 'react';
import AuthContext from './Store.js/auth-context';

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
        { !authCtx.isLoggedIn &&  <Route path="/auth" element={<AuthPage />} />}
        { authCtx.isLoggedIn && <Route path="/profile" element={<UserProfile />} />}
        <Route path='*' element={<HomePage />}/>
        </Routes>
        
      </Layout>
    </BrowserRouter>
  );
}

export default App;
