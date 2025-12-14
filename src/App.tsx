import { Button } from "./components/ui/button";
import useLocalStorage from "./hooks/useLocalStorage";

const App = () => {
  const [count, setCount] = useLocalStorage("test-count", 0);
  return (
    <div className="p-10">
      <p>Count: {count}</p>
      <Button onClick={() => setCount(count + 1)}>Increment</Button>
      <Button onClick={() => setCount(0)}>Reset</Button>
    </div>
  );
};

export default App;
