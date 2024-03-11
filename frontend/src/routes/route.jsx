import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import Forbidden from '../screens/Forbidden';
// Import other necessary screens

const PrivateRoute = ({ element: Element, roles, ...rest }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const userRole = userInfo?.role;

  return (
    <Route
      {...rest}
      element={
        userInfo ? (
          roles.includes(userRole) ? (
            <Element />
          ) : (
            <Navigate to="/forbidden" replace />
          )
        ) : (
          <Navigate to="/login" replace state={{ from: rest.location }} />
        )
      }
    />
  );
};

const routes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/forbidden" element={<Forbidden />} />
      {/* Add other public routes */}

      {/* Private routes */}
      <PrivateRoute
        path="/admin"
        element={AdminDashboard}
        roles={['admin']}
      />
      <PrivateRoute
        path="/profile"
        element={UserProfile}
        roles={['custome', 'admin', 'staff', 'manager']}
      />
      {/* Add other private routes */}
    </Routes>
  );
};

export default routes;
