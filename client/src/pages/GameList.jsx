import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/ui/Header";

const GameList = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      const token = localStorage.getItem("token");
      // console.log("token:", token);
      try {
        const res = await axios.get("http://localhost:5000/api/games", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGames(res.data);
      } catch (err) {
        console.error("Error fetching games:", err);
      }
    };

    fetchGames();
  }, []);

  return (
    <>
      <Header />
      <div className="p-6 text-white bg-[#1e1e2f] min-h-screen">
        <h1 className="text-2xl font-bold text-[#ffcc00] mb-6">Hosted Games</h1>
        <div className="space-y-4">
          {games.length === 0 && <p>No games hosted yet.</p>}
          {games.map((game) => (
            <Link
              key={game.id}
              to={`/games/${game.id}`}
              className="block p-4 bg-[#313244] rounded-lg hover:bg-[#2d7d46] transition"
            >
              <h2 className="text-xl font-semibold">{game.title}</h2>
              <p className="text-sm text-[#aaaaaa]">{game.description}</p>

              <p className="mt-1 text-sm">
                Host: <span className="font-medium">{game.host_name}</span>
              </p>

              <p className="text-sm">
                Start Time:{" "}
                {new Date(game.start_time).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>

              <p className="text-sm">Max Players: {game.max_players}</p>
              <p className="text-sm">
                Current Players: {game.player_count} / {game.max_players}
              </p>
              <p className="text-sm">
                Ranked: {game.is_ranked ? "Yes ✅" : "No ❌"}
              </p>
              <p className="text-sm">
                Discord Invite: {game.invite ? "Yes ✅" : "No ❌"}
              </p>
              <p className="text-sm">Status: {game.status}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default GameList;
