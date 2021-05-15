import React from "react";
import Calculator from "./components/calculator";
import { useState } from "react";
import "./styles/main.scss";

export type Theme = "1" | "2" | "3";

function App() {
  const [theme, setTheme] = useState<Theme>("1");
  return (
    <div className={`App theme-${theme}`}>
      <Calculator theme={theme} setTheme={setTheme} />
    </div>
  );
}

export default App;
