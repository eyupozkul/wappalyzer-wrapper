import { useRoutes } from "react-router-dom";
import { Home, Details } from "./pages";

function App() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/details",
      element: <Details />,
    },
  ]);

  return routes;
}

export default App;
