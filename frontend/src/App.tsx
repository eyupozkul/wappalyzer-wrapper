import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <p className="text-center text-xl">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
