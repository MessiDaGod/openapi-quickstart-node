import React from 'react';
import '@/styles/globals.css';
// import LandingPage from '../components/pages/LandingPage';
// import LoginPage from '../components/pages/LoginPage';
// import RegisterPage from '../components/pages/RegisterPage';
// import ForgetPasswordPage from '../components/pages/ForgetPasswordPage';
// import HomePage from '../components/pages/HomePage';

const App = ({ Component, pageProps }) => {
return <Component {...pageProps} />;
};

export default App;