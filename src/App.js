import { useState } from "react";
import { Login } from "./component/Login";
import { Signup } from "./component/Signup";
import { Event } from "./component/Event";
import { Box, Button } from "@chakra-ui/react";
const App = () => {
  const [view, setView] = useState("login");
  const [eventView, seteventView] = useState(false);
  const [user, setUser] = useState(null);

  const handleLoginBtn = (userData) => {
    setUser(userData);
    setView("events");
    seteventView(true);
  };

  const handleSignBtn = () => {
    setView("login");
  };

  const handleToggleBtn = () => {
    if (user) {
      seteventView((prev) => !prev);
    }
  };

  return (
    <Box p={5} ml={"35%"}>
      {view === "login" && (
        <>
          <Button onClick={() => setView("signup")} mb={4}>
            Sign Up
          </Button>
          <Button onClick={() => setView("login")} mb={4}>
            Login
          </Button>
          <Login onLogin={handleLoginBtn} />
        </>
      )}
      {view === "signup" && (
        <>
          <Button onClick={() => setView("login")} mb={4}>
            Login
          </Button>
          <Signup onSignup={handleSignBtn} />
        </>
      )}
      {view === "events" && (
        <>
          <Button onClick={() => setView("login")} mb={4}>
            Logout
          </Button>
          <Button mt={4} onClick={handleToggleBtn}>
            {eventView ? "Hide Events" : "See Events"}
          </Button>
          {eventView && <Event />}
        </>
      )}
    </Box>
  );
};

export default App;
