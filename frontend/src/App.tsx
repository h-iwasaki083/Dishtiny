// import { StrictMode } from 'react';
import "./App.css";
import ExamplePage from "./pages/Example";
import HomePage from "./pages/Home";
import ListPage from "./pages/List";
import DetailPage from "./pages/Detail";
import InfoPage from "./pages/Info";

import { Routes, Route } from "react-router";
// import { Route } from 'react-router';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { BrowserRouter, Routes } from 'react-router-dom';

function App() {
  return (
    // <BrowserRouter>
    <>
      <Routes>
        <Route path="/example" element={<ExamplePage></ExamplePage>} />
        <Route path="/" element={<HomePage></HomePage>} />
        <Route path="/list" element={<ListPage></ListPage>} />
        <Route path="/detail/:id" element={<DetailPage></DetailPage>} />
        {/* <Route path="/info" element={<InfoPage></InfoPage>}/> */}
      </Routes>
      {/*  </BrowserRouter> */}
    </>
  );
}

export default App;
