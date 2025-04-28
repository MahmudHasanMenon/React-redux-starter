import "./App.css";
import NavBar from "./components/NavBar";
import { AppRoutes } from "./navigation/AppRoutes";

function App() {
  return (
    <>
      <NavBar />
      <AppRoutes />
    </>
  );
}

export default App;
