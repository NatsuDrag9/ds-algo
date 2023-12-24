import "./App.scss";
import Stack from "./components/Stack";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import LinkedList from "./components/Linkedlist";
import Queue from "./components/Queue";
import PriorityQueue from "./components/PriorityQueue";
import MySet from "./components/MySet";
import Heap from "./components/Heap";

function App() {
  return (
    <div className="app">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Stack />}>
        </Route>
        <Route path="/stack" element={<Stack />} />
        <Route path="/linked-list" element={<LinkedList />} />
        <Route path="/queue" element={<Queue />} />
        <Route path="/priority-queue" element={<PriorityQueue />} />
        <Route path="/set" element={<MySet />} />
        <Route path="/heap" element={<Heap />} />
      </Routes>
    </div>
  );
}

export default App;
