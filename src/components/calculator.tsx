import CalculatorBtn from "./calculator-btn";
import { Dispatch, SetStateAction, useState } from "react";
import { solveExpression } from "../util/solve-expression";
import { Theme } from "../App";

interface CalculatorProps {
  theme: "1" | "2" | "3";
  setTheme: Dispatch<SetStateAction<Theme>>;
}

const Calculator: React.FC<CalculatorProps> = ({ theme, setTheme }) => {
  const [lastAnswer, setLastAnswer] = useState("");
  const [input, setInput] = useState("");
  const [operatorSelected, setOperatorSelected] = useState(false);
  const [decimalUsed, setDecimalUsed] = useState(false);
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
    { type: "operation", val: "/" },
    { type: "operation", val: "*" },

    { type: "action", val: "RESET" },
    { type: "action", val: "=" },
  ];
  const handleThemeChange = (e: any) => {
    setTheme(e.target.id.split("-")[1]);
  };
  return (
    <div className={`calculator theme-${theme}`}>
      <div className='calculator__header'>
        <h1>Calculator</h1>
      </div>
      <div className='calculator__theme-selector'>
        <h1>Theme</h1>
        <input
          type='radio'
          className=''
          id='rad-1'
          name='theme'
          checked={theme === "1"}
          onClick={handleThemeChange}
        />
        <input
          type='radio'
          className=''
          id='rad-2'
          name='theme'
          checked={theme === "2"}
          onClick={handleThemeChange}
        />
        <input
          type='radio'
          className=''
          id='rad-3'
          name='theme'
          checked={theme === "3"}
          onClick={handleThemeChange}
        />
      </div>
      <div className='calculator__input'>
        <span>{input}</span>
        <div className='calculator__input__ans'>
          <span>{`${lastAnswer}`}</span>
        </div>
      </div>
      {calcBtns.map((btn, ind) => {
        if (btn.type === "digit") {
          return (
            <CalculatorBtn
              type='digit'
              value={btn.val}
              order={ind + 1}
              onClick={() => {
                if (btn.val === ".") {
                  if (!decimalUsed) {
                    setInput(input + btn.val);
                    setDecimalUsed(true);
                    setOperatorSelected(false);
                  }
                } else if (btn.val === "0") {
                  if (input.length > 0) {
                    setInput(input + btn.val);
                    setOperatorSelected(false);
                  }
                } else {
                  setInput(input + btn.val);
                  setOperatorSelected(false);
                }
              }}
            />
          );
        } else if (btn.type === "operation") {
          return (
            <CalculatorBtn
              type={btn.type}
              value={btn.val}
              order={ind + 1}
              onClick={() => {
                if (!operatorSelected && btn.val !== "DEL") {
                  setInput(`${input} ${btn.val} `);
                  setOperatorSelected(true);
                  setDecimalUsed(false);
                } else if (btn.val === "DEL" && input.length > 0) {
                  let endPoint = 1;
                  if (input[input.length - 1] === ".") {
                    setDecimalUsed(false);
                  }
                  if (operatorSelected) {
                    console.log("this was ran");
                    setOperatorSelected(false);
                    endPoint += 2;
                  }
                  const newInput = input.slice(0, input.length - endPoint);
                  //remove operator
                  if (newInput[newInput.length - 1] === " ") {
                    setOperatorSelected(true);
                  }

                  setInput(newInput);
                }
              }}
            />
          );
        } else if (btn.type === "action") {
          let handleClick = () => {};
          if (btn.val === "=") {
            handleClick = () => {
              setLastAnswer(input);
              setInput(`${solveExpression(input)}`);
              setDecimalUsed(false);
              setOperatorSelected(false);
            };
          } else {
            //reset button
            handleClick = () => {
              setInput("");
              setLastAnswer("");
              setDecimalUsed(false);
              setOperatorSelected(false);
            };
          }
          return (
            <CalculatorBtn
              type={btn.type}
              value={btn.val}
              order={ind + 1}
              onClick={handleClick}
            />
          );
        }
      })}
    </div>
  );
};

export default Calculator;
