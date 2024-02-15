import "./App.css";
import { GamesPage } from "./pages/games";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Navbar } from "./components/navbar";
import { Standings } from "./pages/standings"
import { Players } from './pages/players'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/players" element={<Players />} />
          <Route path="/standings" element={<Standings />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
