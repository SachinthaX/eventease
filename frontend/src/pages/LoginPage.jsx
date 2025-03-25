// src/pages/LoginPage.jsx
import {
    Box, Heading, Input, Button, VStack, Text, useToast, FormControl, FormLabel, FormErrorMessage,
    InputGroup, InputRightElement
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { useAuth } from '../context/AuthContext';
  import { useNavigate } from 'react-router-dom';
  import axios from '../services/axios';
  
  const LoginPage = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const { login } = useAuth();
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const { data } = await axios.post('/api/auth/login', form);
        login(data); // store in context + localStorage
        toast({ title: 'Login successful!', status: 'success', duration: 2000 });
        navigate('/');
        
      } catch (error) {
        toast({
          title: 'Login failed',
          description: error?.response?.data?.message || 'Invalid credentials',
          status: 'error',
          duration: 3000
        });
      } finally {
        setLoading(false);
      }
    };
  
    const handleGoogleLogin = () => {
      window.location.href = 'http://localhost:5000/api/auth/google';
    };
  
    return (
      <Box maxW="md" mx="auto" mt={12} p={8} borderWidth="1px" borderRadius="lg" boxShadow="lg">
        <Heading mb={6} textAlign="center" fontSize="2xl">Sign in to EventEase</Heading>
  
        <form onSubmit={handleLogin}>
          <VStack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </FormControl>
  
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                />
                <InputRightElement width="3rem">
                  <Button size="sm" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Text fontSize="sm" textAlign="right" width="full">
            <Button variant="link" colorScheme="teal" onClick={() => navigate('/forgot-password')}>
                Forgot Password?
            </Button>
            </Text>

  
            <Button colorScheme="teal" type="submit" width="full" isLoading={loading}>
              Sign In
            </Button>
  
            <Button variant="outline" width="full" onClick={handleGoogleLogin}>
              Sign in with Google
            </Button>
  
            <Text fontSize="sm">
              Don’t have an account? <Button variant="link" colorScheme="teal" onClick={() => navigate('/register')}>Register</Button>
            </Text>
          </VStack>
        </form>
      </Box>
    );
  };
  
  export default LoginPage;
  