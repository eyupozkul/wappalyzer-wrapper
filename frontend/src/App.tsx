import { useRoutes } from "react-router-dom";
import { Home } from "./pages";
import socketIO from "socket.io-client";
import { BACKEND_HOST, BACKEND_PORT } from "./config";

const socket = socketIO(`http://${BACKEND_HOST}:${BACKEND_PORT}`);

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
