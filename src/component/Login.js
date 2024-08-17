import { Box, Button, FormLabel, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";

const USER_URL = "https://event-sever-app.onrender.com/user";

export const Login = ({ onLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.get(USER_URL);
      const users = response.data;
      const userExists = users.some(
        (user) => user.email === email && user.name === name
      );

      if (userExists) {
        onLogin({ name, email });
        setError("");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Error fetching user data");
    }
  };

  return (
    <Box p={5} borderWidth="1px" borderRadius="md" bg="gray.100" w="96">
      <FormLabel>Name</FormLabel>
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <FormLabel>Email</FormLabel>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button mt={4} onClick={handleLogin}>
        Login
      </Button>
      {error && <Text color="red.500">{error}</Text>}
    </Box>
  );
};
