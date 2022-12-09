import { useRoutes } from "react-router-dom";
import { Home } from "./pages";

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
  ]);

  return routes;
}

export default App;
