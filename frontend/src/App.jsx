import React from 'react';
import { Routes, Route } from 'react-router-dom';
import "./App.css";
import ExamplePage from "./pages/Example";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ExamplePage></ExamplePage>} />
      </Routes>
    </>
  );
}

export default App;
