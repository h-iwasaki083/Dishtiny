import { Routes, Route } from 'react-router';
import './App.css'
import ExamplePage from './pages/Example';
import HomePage from './pages/Home';
import ListPage from './pages/List';
import DetailPage from './pages/Detail';
import InfoPage from './pages/Info';

function App() {
  return (
    <>
      <Routes>
        <Route path="/example" element={<ExamplePage></ExamplePage>}/>
        <Route path="/" element={<HomePage></HomePage>}/>
        <Route path="/list" element={<ListPage></ListPage>}/>
        <Route path="/:id" element={<DetailPage></DetailPage>}/>
        <Route path="/info" element={<InfoPage></InfoPage>}/>
      </Routes>
    </>
  )
}

export default App
