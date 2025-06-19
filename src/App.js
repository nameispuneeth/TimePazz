import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import History from './Components/History';
function App() {
  return (
    <Router>
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/history" element={<History/>}/>
    </Routes>
    </Router>
  );
}

export default App;
