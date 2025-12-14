import Header from "./components/auth/Header";
import LoginForm from "./components/auth/LoginForm";
import { Button } from "./components/ui/button";
import useLocalStorage from "./hooks/useLocalStorage";

const App = () => {
  const [count, setCount] = useLocalStorage("test-count", 0);
  return (
    <div className="p-10">
      <p>Count: {count}</p>
      <Button onClick={() => setCount(count + 1)}>Increment</Button>
      <Button onClick={() => setCount(0)}>Reset</Button>
      <Header username="TestUser" onLogout={() => alert("Logged out")} />
      <LoginForm onLogin={(username) => alert(`Logged in as ${username}`)} />
    </div>
  );
};

export default App;
