import React from "react";
import Calculator from "./components/calculator";
import "./styles/main.scss";
function App() {
  console.log("hello");
  return (
    <div className='App'>
      <Calculator theme='1' />
    </div>
  );
}

export default App;
