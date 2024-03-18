import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Layout } from 'antd';
import routes from './routes/route';
import HomePage from './user/HomePage';

const { Header, Footer } = Layout;

const App = () => {
  return (
    <>
      <Layout>
        <Header>{/* Add header content */}</Header>
        <RouterProvider router={routes}/>
        <Footer>{/* Add footer content */}</Footer>
      </Layout>
    </>
  );
};

export default App;
