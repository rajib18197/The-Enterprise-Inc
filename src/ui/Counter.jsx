import { createContext, useContext, useState } from "react";
import Button from "./Button";

const CounterContext = createContext();

export default function Counter({ children }) {
  const [count, setCount] = useState(0);
  const increment = function () {
    setCount((count) => count + 1);
  };

  const decrement = function () {
    setCount((count) => count - 1);
  };

  return (
    <CounterContext.Provider value={{ count, increment, decrement }}>
      {children}
    </CounterContext.Provider>
  );
}

function Label({ label, labelRange }) {
  return (
    <div>
      <h3>{label}</h3>
      <p>{labelRange}</p>
    </div>
  );
}

function Count() {
  const { count } = useContext(CounterContext);

  return <p>{count}</p>;
}

function Increment({ icon }) {
  const { increment } = useContext(CounterContext);

  return <Button onClick={increment}>{icon}</Button>;
}

function Decrement({ icon }) {
  const { decrement } = useContext(CounterContext);

  return <Button onClick={decrement}>{icon}</Button>;
}

Counter.Label = Label;
Counter.Count = Count;
Counter.Increment = Increment;
Counter.Decrement = Decrement;
