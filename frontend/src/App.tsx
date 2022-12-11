import { useRoutes } from "react-router-dom";
import { Home } from "./pages";
import socketIO from "socket.io-client";

// TODO: Read port from config
const socket = socketIO("http://localhost:4174");

function App() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home socket={socket} />,
    },
    {
      path: "/home",
      element: <Home socket={socket} />,
    },
  ]);

  return routes;
}

export default App;
