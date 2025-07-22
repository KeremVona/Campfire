import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import GameInfo from "../components/game_details/GameInfo";
import RuleSection from "../components/game_details/RuleSection";
import JoinLeaveControls from "../components/game_details/JoinLeaveControls";
import PlayerList from "../components/game_details/PlayerList";

export default function GameDetails() {
  const { id } = useParams(); // gameId
  const [game, setGame] = useState(null);

  const [error, setError] = useState("");

  const [hasJoined, setHasJoined] = useState(false);
  const [players, setPlayers] = useState([]);

  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGameDetails = async () => {
      const token = localStorage.getItem("token");

      try {
        const [gameRes, joinedRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/games/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`http://localhost:5000/api/games/${id}/has-joined`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setGame(gameRes.data);
        setHasJoined(joinedRes.data.hasJoined);
        fetchPlayers(); // Optional: to refresh player list
      } catch (err) {
        console.error("Error loading game or join status:", err);
      }
    };

    fetchGameDetails();
  }, [id]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/user-information",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;
        setUsername(data.username);
        setUserId(data.id);
        // console.log("Fetched dashboard data:", data);
      } catch (err) {
        console.error("Failed to fetch user:", err.message);
      }
    };

    fetchUser();
  }, []);

  const handleJoin = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/games/join",
        { id }, // no need to pass userId — it comes from the token
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // setPlayerCount(res.data.playerCount);
      setHasJoined(true);
      fetchPlayers(); // optional: fetch list of players
    } catch (err) {
      console.error("Join failed:", err.response?.data?.error || err.message);
    }
  };

  const handleLeave = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/games/leave",
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // setPlayerCount(res.data.playerCount);
      setHasJoined(false);
      fetchPlayers(); // Refresh the player list
    } catch (err) {
      console.error("Leave failed:", err.response?.data?.error || err.message);
    }
  };

  const handleKick = async (playerId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/games/kick",
        {
          gameId: game.id, // game.id should be available from the game detail page
          playerId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        console.log(res.data.message);
        fetchPlayers(); // Refresh the player list
      }
    } catch (err) {
      console.error(
        "Failed to kick player:",
        err.response?.data || err.message
      );
    }
  };

  const fetchPlayers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/games/${id}/players`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPlayers(res.data.players);
    } catch (err) {
      console.error(
        "Failed to fetch players:",
        err.response?.data?.error || err.message
      );
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, [id]);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    if (!window.confirm("Are you sure you want to delete this game?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/games/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Game deleted!");
      navigate("/games");
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete game.");
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (!game) return <p className="text-white">Loading game...</p>;

  const isHost = userId === game.host_id;

  return (
    <div className="p-6 text-white bg-[#1e1e2f] min-h-screen">
      <GameInfo game={game} isHost={isHost} onDelete={handleDelete} />
      <RuleSection
        generalRules={game.generalRules}
        countryRules={game.countryRules}
      />
      <JoinLeaveControls
        hasJoined={hasJoined}
        onJoin={handleJoin}
        onLeave={handleLeave}
      />
      <PlayerList
        players={players}
        isHost={isHost}
        userId={userId}
        onKick={handleKick}
      />
    </div>
  );
}
