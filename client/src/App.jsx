import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./pages/Home";
import HostGame from "./pages/HostGame";
import GameList from "./pages/GameList";
import GameDetails from "./pages/GameDetails";
import TournamentList from "./pages/Tournament/TournamentList";
import MakeTournament from "./pages/Tournament/MakeTournament";
import TournamentDetails from "./pages/Tournament/TournamentDetails";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected route */}
          <Route path="/home" element={<ProtectedRoute content={<Home />} />} />
          <Route
            path="/host"
            element={<ProtectedRoute content={<HostGame />} />}
          />
          <Route
            path="/games"
            element={<ProtectedRoute content={<GameList />} />}
          />
          <Route
            path="/games/:id"
            element={<ProtectedRoute content={<GameDetails />} />}
          />
          <Route
            path="/tournaments"
            element={<ProtectedRoute content={<TournamentList />} />}
          />
          <Route
            path="/host-tournament"
            element={<ProtectedRoute content={<MakeTournament />} />}
          />
          <Route
            path="/tournaments/:id"
            element={<ProtectedRoute content={<TournamentDetails />} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
