import React from 'react';
import Header from '../header/Header';
import Routers from '../../routers/Routers'; // Import your routes

const Layout = () => {
    return (
      <>
        <Header />
        <main className="main-content">
          <Routers />
        </main>
       
      </>
    );
  };
  
  export default Layout;
  