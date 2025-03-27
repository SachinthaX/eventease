import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Stack,
  Button,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
//import UpcomingEvents from "./UpcomingEvents";

const Home = () => {
  const gradient = useColorModeValue(
    "linear(to-r, teal.400, purple.500)",
    "linear(to-r, teal.300, purple.400)"
  );

  return (
    <Box>
      {/* Hero Section */}
      <Box
        bgGradient={gradient}
        color="white"
        py={{ base: 20, md: 28 }}
        textAlign="center"
      >
        <Container maxW="7xl">
          <Heading fontSize={{ base: "3xl", md: "5xl" }} fontWeight="bold" mb={4}>
            Welcome to EventEase
          </Heading>
          <Text fontSize={{ base: "md", md: "xl" }} mb={6}>
            Your one-stop solution for seamless event management.
          </Text>
          <Button
            as={RouterLink}
            to="/events"
            size="lg"
            colorScheme="whiteAlpha"
            bg="white"
            color="teal.600"
            _hover={{ bg: "gray.100" }}
            fontWeight="bold"
          >
            Explore Events
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={20} bg={useColorModeValue("gray.50", "gray.800")}>
        <Container maxW="6xl">
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            {[
              {
                title: "Easy Event Creation",
                text: "Plan and manage your events with just a few clicks.",
              },
              {
                title: "Real-Time Updates",
                text: "Get instant notifications for upcoming events and changes.",
              },
              {
                title: "Ticket Management",
                text: "Track ticket sales and manage your event's seating arrangements.",
              },
            ].map((feature, index) => (
              <Box
                key={index}
                p={6}
                borderRadius="lg"
                bg="white"
                boxShadow="lg"
                _hover={{ transform: "translateY(-4px)", transition: "0.3s" }}
              >
                <Heading size="md" mb={2} color="teal.500">
                  {feature.title}
                </Heading>
                <Text color="gray.600">{feature.text}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Upcoming Events */}
      {/*<Box py={20} bg={useColorModeValue("white", "gray.900")}>
        <Container maxW="6xl">
          <Heading textAlign="center" size="xl" mb={10} color="teal.600">
            Upcoming Events
          </Heading>
          <UpcomingEvents />
        </Container>
      </Box>*/}

      {/* CTA Section */}
      <Box
        py={24}
        textAlign="center"
        bgGradient="linear(to-r, purple.500, teal.500)"
        color="white"
      >
        <Container maxW="7xl">
          <Heading fontSize={{ base: "2xl", md: "4xl" }} mb={4}>
            Join the EventEase Community
          </Heading>
          <Text fontSize="lg" mb={6}>
            Stay connected with your audience and grow your event's impact.
          </Text>
          <Button
            as={RouterLink}
            to="/events"
            size="lg"
            colorScheme="whiteAlpha"
            variant="outline"
            borderColor="white"
            _hover={{ bg: "whiteAlpha.300" }}
            rounded="full"
          >
            Start Organizing
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
