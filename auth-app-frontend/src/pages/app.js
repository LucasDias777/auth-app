import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        router.push('/login');
      } else if (router.pathname === '/login') {
        router.push('/dashboard');
      }
    } else if (router.pathname !== '/login') {
      router.push('/login');
    }
  }, [router]);

  return <Component {...pageProps} />;
};

export default MyApp;
