// src/components/Header.jsx
import {
    Box, Flex, HStack, IconButton, Button, useDisclosure, Stack,
    Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent,
    DrawerCloseButton, Link as ChakraLink, useColorModeValue, Text,
    Menu, MenuButton, MenuList, MenuItem, Avatar, useToast, useColorMode
  } from '@chakra-ui/react';
  import { MoonIcon, SunIcon } from '@chakra-ui/icons';
  import { FiMenu, FiUser } from 'react-icons/fi';
  import { MdOutlineEventNote } from 'react-icons/md';
  import { Link as RouterLink, useNavigate } from 'react-router-dom';
  import { useAuth } from '../context/AuthContext';
  
  const navLinks = [
    { name: 'Events', path: '/upcoming-events' },
    { name: 'Create Event', path: '/create-event', isCTA: true },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];
  
  const Header = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user, logout } = useAuth();
    const { colorMode, toggleColorMode } = useColorMode();
    const navigate = useNavigate();
  
    const toast = useToast();
    const handleLogout = () => {
        toast({ title: 'Logged out', status: 'info', duration: 2000 });
        logout();
        navigate('/login');
      };
      
  
    const linkColor = useColorModeValue('gray.100', 'gray.100');
    const linkHover = useColorModeValue('teal.200', 'teal.300');
    const bgBlur = useColorModeValue('rgba(20, 20, 40, 0.75)', 'rgba(20, 20, 40, 0.85)');
    const brandGradient = "linear(to-r, teal.400, purple.500)";
  

    return (
      <Box position="sticky" top="0" zIndex="sticky" bg={bgBlur} backdropFilter="blur(12px)" boxShadow="sm">
        <Flex align="center" justify="space-between" px={{ base: 4, md: 10 }} py={4} maxW="7xl" mx="auto">
          {/* Logo */}
          <ChakraLink
            as={RouterLink}
            to="/"
            display="flex"
            alignItems="center"
            fontWeight="bold"
            fontSize="2xl"
            bgGradient={brandGradient}
            bgClip="text"
          >
            <MdOutlineEventNote size={28} style={{ marginRight: '8px' }} />
            EventEase
          </ChakraLink>
  
          {/* Desktop Nav */}
          <HStack spacing={6} display={{ base: 'none', md: 'flex' }} alignItems="center">
            
            {navLinks.map((link, index) =>
              link.isCTA ? (
                <Button
                  key={index}
                  as={RouterLink}
                  to={link.path}
                  size="sm"
                  px={5}
                  bgGradient="linear(to-r, purple.500, teal.400)"
                  color="white"
                  _hover={{ bgGradient: 'linear(to-r, teal.500, purple.600)' }}
                  rounded="full"
                  shadow="md"
                >
                  {link.name}
                </Button>
              ) : (
                <ChakraLink
                  key={index}
                  as={RouterLink}
                  to={link.path}
                  fontWeight="medium"
                  fontSize="sm"
                  color={linkColor}
                  _hover={{ color: linkHover }}
                >
                  {link.name}
                </ChakraLink>
              )
            )}

                {/* <IconButton
                    icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    aria-label="Toggle color mode"
                    variant="ghost"
                    onClick={toggleColorMode}
                /> */}
  
            {/*  Auth Dropdown */}
            {user ? (
              <Menu>
              <MenuButton
                as={Button}
                rightIcon={<Avatar size="sm" name={user.name} />}
                bgGradient="linear(to-r, purple.500, teal.400)"
                color="white"
                _hover={{ bgGradient: 'linear(to-r, teal.500, purple.600)', boxShadow: 'md' }}
                _active={{ bgGradient: 'linear(to-r, teal.600, purple.700)' }}
                rounded="full"
                px={5}
                fontWeight="medium"
              >
                {user.name.split(' ')[0]}
              </MenuButton>
            
              <MenuList>
                <MenuItem onClick={() => navigate(user.role === 'admin' ? '/admin' : '/profile')}>
                  {user.role === 'admin' ? 'Admin Dashboard' : 'My Profile'}
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
            
            
            ) : (
              <Button
                as={RouterLink}
                to="/login"
                size="sm"
                leftIcon={<FiUser />}
                bg="white"
                color="teal.500"
                _hover={{ bg: 'teal.50', boxShadow: 'md' }}
                rounded="full"
                px={5}
              >
                Sign In
              </Button>
            )}
          </HStack>
  
          {/* Mobile Icon */}
          <IconButton
            icon={<FiMenu />}
            variant="ghost"
            aria-label="Toggle Menu"
            onClick={onOpen}
            color="white"
            display={{ base: 'flex', md: 'none' }}
          />
        </Flex>
  
        {/* Mobile Drawer */}
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent bg="gray.800" color="white">
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">
              <Flex align="center">
                <MdOutlineEventNote size={24} style={{ marginRight: '8px' }} />
                <Text fontWeight="bold" fontSize="xl">EventEase</Text>
              </Flex>
            </DrawerHeader>
  
            <DrawerBody>
              <Stack spacing={5} mt={6}>
                {navLinks.map((link, index) =>
                  link.isCTA ? (
                    <Button
                      key={index}
                      as={RouterLink}
                      to={link.path}
                      colorScheme="purple"
                      w="full"
                      onClick={onClose}
                      rounded="full"
                    >
                      {link.name}
                    </Button>
                  ) : (
                    <ChakraLink
                      key={index}
                      as={RouterLink}
                      to={link.path}
                      fontSize="md"
                      fontWeight="medium"
                      _hover={{ color: 'teal.300' }}
                      onClick={onClose}
                    >
                      {link.name}
                    </ChakraLink>
                  )
                )}
  
                {/* Mobile Auth UI */}
                {user ? (
                  <Stack spacing={3}>
                    <Button
                      onClick={() => {
                        navigate(user.role === 'admin' ? '/admin' : '/profile');
                        onClose();
                      }}
                      colorScheme="teal"
                      w="full"
                      rounded="full"
                    >
                      {user.role === 'admin' ? 'Admin Dashboard' : 'My Profile'}
                    </Button>
                    <Button onClick={handleLogout} variant="outline" colorScheme="red" w="full" rounded="full">
                      Logout
                    </Button>
                  </Stack>
                ) : (
                  <Button
                    as={RouterLink}
                    to="/login"
                    leftIcon={<FiUser />}
                    variant="outline"
                    colorScheme="teal"
                    w="full"
                    rounded="full"
                    onClick={onClose}
                  >
                    Sign In
                  </Button>
                )}


              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    );
  };
  
  export default Header;
  