import { useEffect, useState } from "react";
import axios from "axios";
import TournamentCard from "../../components/tournament/tournament_list/TournamentCard";
import Header from "../../components/ui/Header";

export default function TournamentList() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tournaments");
        setTournaments(res.data.tournaments);
      } catch (err) {
        console.error("Failed to load tournaments:", err);
      }
    };

    fetchTournaments();
  }, []);

  return (
    <>
      <Header />
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tournaments.map((tournament) => (
          <TournamentCard key={tournament.id} tournament={tournament} />
        ))}
      </div>
    </>
  );
}
