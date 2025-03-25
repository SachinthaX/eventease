import {
    Box, Heading, Input, Button, VStack, Text, useToast, FormControl, FormLabel,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import axios from '../services/axios';

  
  const RegisterPage = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleRegister = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const res = await axios.post('/api/auth/register', form);
        toast({
          title: 'Account created!',
          description: 'Check your email to verify your account.',
          status: 'success',
          duration: 3000
        });
        navigate('/login');
      } catch (error) {
        toast({
          title: 'Registration failed',
          description: error?.response?.data?.message || 'Something went wrong',
          status: 'error',
          duration: 3000
        });
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <Box maxW="md" mx="auto" mt={12} p={8} borderWidth="1px" borderRadius="lg" boxShadow="lg">
        <Heading mb={6} textAlign="center" fontSize="2xl">Create your EventEase account</Heading>
  
        <form onSubmit={handleRegister}>
          <VStack spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" />
            </FormControl>
  
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
            </FormControl>
  
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input name="password" type="password" value={form.password} onChange={handleChange} placeholder="••••••••" />
            </FormControl>
  
            <Button colorScheme="teal" type="submit" width="full" isLoading={loading}>
              Register
            </Button>
  
            <Text fontSize="sm">
              Already have an account? <Button variant="link" colorScheme="teal" onClick={() => navigate('/login')}>Login</Button>
            </Text>
          </VStack>
        </form>
      </Box>
    );
  };
  
  export default RegisterPage;
  