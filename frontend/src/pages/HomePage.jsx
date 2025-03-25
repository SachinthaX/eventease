// src/pages/HomePage.jsx
import { Box, Heading, Text, Button, Stack, Image, SimpleGrid, Icon, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MdEvent, MdDashboard, MdFeedback, MdSecurity } from 'react-icons/md';

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const features = [
    {
      icon: MdEvent,
      title: 'Smart Event Management',
      desc: 'Plan, publish, and promote your events with ease using our intuitive tools.'
    },
    {
      icon: MdDashboard,
      title: 'Admin Dashboard',
      desc: 'Admins can manage users, events, and monitor system-wide activity securely.'
    },
    {
      icon: MdFeedback,
      title: 'Feedback & Ratings',
      desc: 'Collect valuable feedback to improve future events and user experience.'
    },
    {
      icon: MdSecurity,
      title: 'Secure & Role-Based Access',
      desc: 'Powerful authentication with role-based control for users and admins.'
    },
  ];

  return (
    <Box maxW="7xl" mx="auto" p={8} mt={10}>
      <Stack spacing={6} align="center" textAlign="center">
        <Heading size="2xl" bgGradient="linear(to-r, teal.400, purple.500)" bgClip="text">
          Welcome to EventEase
        </Heading>
        <Text fontSize="lg" color="gray.600">
          Your smart event management system. Seamless, secure, and intuitive.
        </Text>
        
        <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
          <Button colorScheme="teal" size="lg" onClick={() => navigate('/upcoming-events')}>
            Browse Events
          </Button>
          {!user && (
            <Button variant="outline" colorScheme="purple" size="lg" onClick={() => navigate('/register')}>
              Get Started
            </Button>
          )}
        </Stack>
      </Stack>

      <Box mt={16}>
        <Heading size="lg" mb={6} textAlign="center">Platform Features</Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          {features.map((feat, idx) => (
            <Stack key={idx} direction="row" spacing={4} align="flex-start">
              <Icon as={feat.icon} boxSize={8} color="teal.400" />
              <Box>
                <Text fontSize="lg" fontWeight="bold" mb={1}>{feat.title}</Text>
                <Text color={useColorModeValue('gray.600', 'gray.400')}>{feat.desc}</Text>
              </Box>
            </Stack>
          ))}
        </SimpleGrid>
      </Box>
      <Stack mt={20} spacing={6} textAlign="center">
        <Heading size="lg">Why Choose EventEase?</Heading>
        <Text fontSize="md" maxW="3xl" mx="auto" color="gray.500">
            From idea to execution, EventEase empowers organizers and attendees with modern tools to
            manage, track, and enjoy events — all in one place.
        </Text>
        </Stack>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mt={12}>
        <Stack textAlign="center" spacing={4}>
            <Heading size="md">1. Discover Events</Heading>
            <Text>Explore a variety of upcoming events and book your spot with ease.</Text>
        </Stack>
        <Stack textAlign="center" spacing={4}>
            <Heading size="md">2. Manage & Track</Heading>
            <Text>Admins can create, edit, and manage events — all from one dashboard.</Text>
        </Stack>
        <Stack textAlign="center" spacing={4}>
            <Heading size="md">3. Engage & Feedback</Heading>
            <Text>Attendees can leave feedback and resell tickets securely if needed.</Text>
        </Stack>
        </SimpleGrid>

        <Box mt={20} textAlign="center">
        <Heading size="lg" mb={6}>What Users Say</Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            <Box p={6} borderWidth="1px" borderRadius="lg" bg="whiteAlpha.50">
            <Text fontStyle="italic">"EventEase made managing my tech meetup a breeze. Loved the dashboard!"</Text>
            <Text fontWeight="bold" mt={2}>– Alex G., Event Organizer</Text>
            </Box>
            <Box p={6} borderWidth="1px" borderRadius="lg" bg="whiteAlpha.50">
            <Text fontStyle="italic">"I booked my concert tickets in seconds and even resold one later. 10/10!"</Text>
            <Text fontWeight="bold" mt={2}>– Priya M., Attendee</Text>
            </Box>
        </SimpleGrid>
        </Box>
        <Box mt={20} textAlign="center">
        <Heading size="lg" mb={4}>Ready to create or join your next event?</Heading>
        <Button colorScheme="teal" size="lg" onClick={() => navigate('/register')}>
            Get Started
        </Button>
        </Box>




    </Box>
  );
};

export default HomePage;