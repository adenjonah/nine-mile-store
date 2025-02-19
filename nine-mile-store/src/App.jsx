import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

function Home() {
  return <h1 className="text-3xl font-bold underline text-red-500">Home Page</h1>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;