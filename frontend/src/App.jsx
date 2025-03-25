// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import VerifyEmailPage from './pages/VerifyEmailPage';
import OAuthSuccess from './pages/OAuthSuccess';
import AdminDashboard from './pages/AdminDashboard';
import HomePage from './pages/HomePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

const App = () => {
  return (
    <>
    <Flex direction="column" minH="100vh">
      <Header />
      <Box flex="1">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
      </Routes>
      </Box>
      <Footer />
      </Flex>
    </>
  );
};

export default App;