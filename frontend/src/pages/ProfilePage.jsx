// src/pages/ProfilePage.jsx
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Box, Heading, VStack, useToast, Spinner,
  FormControl, FormLabel, Input, Button, Tabs, TabList, TabPanels, Tab, TabPanel, Text,
  HStack, useColorModeValue, useDisclosure
} from '@chakra-ui/react';

import { useRef, useEffect, useState } from 'react';
import axios from '../services/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '' });
  const [loading, setLoading] = useState(true);

  const toast = useToast();
  const navigate = useNavigate();
  const textColor = useColorModeValue('gray.800', 'whiteAlpha.900');
  const cardBg = useColorModeValue('white', 'gray.700');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  useEffect(() => {
    if (!user?.token) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const { data } = await axios.get('/api/users/profile', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setProfile(data);
        setFormData({ name: data.name || '', email: data.email || '' });
        setLoading(false);
      } catch (err) {
        toast({
          title: 'Error loading profile',
          description: err.response?.data?.message || 'Something went wrong',
          status: 'error',
          duration: 3000,
        });
        logout();
      }
    };

    fetchProfile();
  }, [user, toast, navigate, logout]);

  const handleProfileUpdate = async () => {
    try {
      const { data } = await axios.put('/api/users/profile', formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setProfile(data);
      toast({ title: 'Profile updated', status: 'success', duration: 2000 });
    } catch (err) {
      toast({ title: 'Update failed', description: err.response?.data?.message, status: 'error' });
    }
  };

  const handlePasswordChange = async () => {
    try {
      await axios.put('/api/users/password', passwordData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      toast({ title: 'Password updated', status: 'success', duration: 2000 });
      setPasswordData({ currentPassword: '', newPassword: '' });
    } catch (err) {
      toast({ title: 'Password change failed', description: err.response?.data?.message, status: 'error' });
    }
  };

  const handleDeleteProfile = async () => {
    try {
      await axios.delete('/api/users/profile', {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      toast({ title: 'Profile deleted', status: 'info', duration: 2000 });
      logout();
      navigate('/register');
    } catch (err) {
      toast({ title: 'Delete failed', description: err.response?.data?.message, status: 'error' });
    }
  };

  if (loading) return <Spinner size="xl" mt={10} color="teal.400" />;

  return (
    <Box bg={cardBg} color={textColor} p={6} borderRadius="lg" maxW="3xl" mx="auto" mt={10} borderWidth="1px" boxShadow="lg">
      <Heading mb={6} size="lg" textAlign="center" color="teal.800">User Profile</Heading>

      <Tabs variant="soft-rounded" colorScheme="teal">
        <TabList justifyContent="center" mb={4}>
          <Tab>Overview</Tab>
          <Tab>Edit Profile</Tab>
          <Tab>Change Password</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
          <VStack spacing={4} align="start">
            <HStack>
              <Box w="80px"><Text fontWeight="medium">Name:</Text></Box>
              <Text>{profile?.name}</Text>
            </HStack>
            <HStack>
              <Box w="80px"><Text fontWeight="medium">Email:</Text></Box>
              <Text>{profile?.email}</Text>
            </HStack>
          </VStack>
          </TabPanel>

          <TabPanel>
            <VStack spacing={4} align="stretch">
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </FormControl>
              <Button colorScheme="blue" onClick={handleProfileUpdate}>Save Changes</Button>
            </VStack>
          </TabPanel>

          <TabPanel>
            <VStack spacing={4} align="stretch">
              <FormControl id="currentPassword">
                <FormLabel>Current Password</FormLabel>
                <Input type="password" value={passwordData.currentPassword} onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })} />
              </FormControl>
              <FormControl id="newPassword">
                <FormLabel>New Password</FormLabel>
                <Input type="password" value={passwordData.newPassword} onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} />
              </FormControl>
              <Button colorScheme="blue" onClick={handlePasswordChange}>Update Password</Button>
              <Button colorScheme="red"  onClick={onOpen}>Delete Profile</Button>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Confirmation Dialog */}
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Account
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? This will permanently delete your account and all your data.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteProfile} ml={3}>
                Yes, Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default ProfilePage;
