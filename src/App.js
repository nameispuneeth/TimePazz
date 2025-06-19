import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import History from './Components/History';
import SudokuGrid from './Components/SudokoSolver';
function App() {
  return (
    <Router>
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/history" element={<History/>}/>
      <Route exact path="/sudoko" element={<SudokuGrid/>}/>
    </Routes>
    </Router>
  );
}

export default App;
