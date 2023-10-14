import { useEffect, useState } from "react";

export default function Counter() {
  const [count, setCounter] = useState(0);
  return (
    <div>
      <label style={{ display: "block" }}>{count}</label>
      <button onClick={() => setCounter(count + 1)}>Click Me</button>
    </div>
  );
}
