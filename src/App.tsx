import "./App.scss";
import Stack from "./components/Stack";
import BootstrapNavbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import LinkedList from "./components/Linkedlist";
import Queue from "./components/Queue";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<BootstrapNavbar />}>
        </Route>
        <Route path="/stack" element={<Stack />} />
        <Route path="/linkedlist" element={<LinkedList />} />
        <Route path="/queue" element={<Queue />} />
      </Routes>
    </div>
  );
}

export default App;
