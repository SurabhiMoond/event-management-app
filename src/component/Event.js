import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Box, Text, Button } from "@chakra-ui/react";

export const API_URL = "https://event-sever-app.onrender.com";
export const EVENTS_URL = "https://event-sever-app.onrender.com/events";

export const Event = () => {
  const [events, setEvents] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await axios.get(EVENTS_URL);
        setEvents(res.data);
      } catch (err) {
        setErr("Error fetching data");
      }
    };
    fetchData();
  }, []);

  if (err) {
    return <Text color="red.500">{err}</Text>;
  }

  return (
    <Box p={5} w="auto" display={"flex"}>
      {events.length === 0 ? (
        <Text>No events available</Text>
      ) : (
        events.map((event) => (
          <Card
            key={event.id}
            p={4}
            mb={4}
            borderWidth="1px"
            borderRadius="md"
            bg="gray.50"
          >
            <Text fontSize="xl" fontWeight="bold">
              {event.name}
            </Text>
            <Text>Organizer: {event.organizerGuest}</Text>
            <Text>Date: {event.date}</Text>
            <Text>Time: {event.time}</Text>
            <Text>
              Meeting ID:{" "}
              <a href="#" style={{ color: "blue" }}>
                {event.meetingId}
              </a>
            </Text>
            <Button
              mt={2}
              w="full"
              fontWeight="bold"
              color="white"
              bgGradient="linear(to-r, blue.300, blue.600)"
              _hover={{
                bgGradient: "linear(to-r, red.500, yellow.500)",
              }}
            >
              Register
            </Button>
          </Card>
        ))
      )}
    </Box>
  );
};
