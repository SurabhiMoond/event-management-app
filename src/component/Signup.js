import { useState } from "react";
import axios from "axios";
import { Box, Button, FormLabel, Input, Text } from "@chakra-ui/react";

const USER_URL = "https://event-sever-app.onrender.com/user";

export const Signup = ({ onSignup }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    try {
      const res = await axios.get(USER_URL);
      const users = res.data;
      const userExists = users.find((user) => user.email === email);
      if (!userExists) {
        await axios.post(USER_URL, { name, email, role: "participant" });
        onSignup(); 
        setError("");
      } else {
        setError("Email already registered");
      }
    } catch (err) {
      setError("Error .... Please try again.");
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
      <Button mt={4} onClick={handleSignup}>
        Sign Up
      </Button>
      {error && <Text color="red.500">{error}</Text>}
    </Box>
  );
};
