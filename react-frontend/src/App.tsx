import { useState } from "react";
import reactLogo from "./assets/react.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex h-screen bg-red-500 items-center ">
      <div className="flex bg-yellow-200 p-10 mx-auto rounded-xl">
        <p className="text-3xl">This page will be updated...</p>
      </div>
    </div>
  );
}

export default App;
