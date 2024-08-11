import "./App.css";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

function App() {
  return (
    <>
      <div className="flex flex-col items-center h-screen justify-center">
        <div className="max-w-[350px] flex flex-col gap-4">
          <h1 className="font-bold text-lg">Login</h1>
          <div className="flex flex-col gap-3">
            <Input placeholder="e-mail" />
            <Input placeholder="senha" />
          </div>
          <div className="max-w-[150px] flex flex-col gap-2 w-full justify-center">
            <Button className="w-full">Entrar</Button>
            <Button className="w-full">Registre-se</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
