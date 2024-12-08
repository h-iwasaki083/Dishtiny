import "./App.css";
import HomePage from "./pages/Home";
import ListPage from "./pages/List";

import { Routes, Route } from "react-router";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>} />
        <Route path="/list" element={<ListPage></ListPage>} />
      </Routes>
    </>
  );
}

export default App;
