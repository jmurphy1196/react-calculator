import CalculatorBtn from "./calculator-btn";
import { useState } from "react";

interface CalculatorProps {
  theme: "1" | "2" | "3";
}

const Calculator: React.FC<CalculatorProps> = ({ theme }) => {
  const [input, setInput] = useState("");
  const calcBtns = [
    { type: "digit", val: "7" },
    { type: "digit", val: "8" },
    { type: "digit", val: "9" },
    { type: "operation", val: "DEL" },

    { type: "digit", val: "4" },
    { type: "digit", val: "5" },
    { type: "digit", val: "6" },
    { type: "operation", val: "+" },

    { type: "digit", val: "1" },
    { type: "digit", val: "2" },
    { type: "digit", val: "3" },
    { type: "operation", val: "-" },

    { type: "digit", val: "." },
    { type: "digit", val: "0" },
    { type: "digit", val: "/" },
    { type: "operation", val: "X" },

    { type: "action", val: "RESET" },
    { type: "action", val: "=" },
  ];
  return (
    <div className={`calculator calculator--${theme}`}>
      <div className='calculator__input'>{input}</div>
      {calcBtns.map((btn, ind) => {
        if (btn.type === "digit") {
          return (
            <CalculatorBtn
              type='digit'
              value={btn.val}
              order={ind + 1}
              onClick={() => setInput(input + btn.val)}
            />
          );
        } else {
          return (
            <CalculatorBtn type={btn.type} value={btn.val} order={ind + 1} />
          );
        }
      })}
    </div>
  );
};

export default Calculator;
