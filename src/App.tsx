import "./App.scss";
import Stack from "./components/Stack";
import BootstrapNavbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import LinkedList from "./components/Linkedlist";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<BootstrapNavbar />}>
        </Route>
        <Route path="/stack" element={<Stack />} />
        <Route path="/linkedlist" element={<LinkedList />} />
      </Routes>
    </div>
  );
}

export default App;
