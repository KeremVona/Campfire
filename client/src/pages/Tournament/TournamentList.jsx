import { useEffect, useState } from "react";
import axios from "axios";

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

  const formatDate = (timestamp) =>
    new Date(timestamp).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tournaments.map((t) => (
        <div
          key={t.id}
          className="p-4 bg-white rounded-2xl shadow-md space-y-2"
        >
          <div className="text-xl font-semibold">{t.name}</div>
          <div className="text-gray-600">{t.description}</div>
          <div className="text-sm text-gray-500">
            🗓 {formatDate(t.start_date)}
          </div>
          <div className="text-sm text-gray-500">
            👤 Organizer: {t.organizer_name}
          </div>
          <div className="text-sm">
            💰 Entry:{" "}
            {t.entry_fee === 0
              ? "Free"
              : `$${(t.entry_fee / 100).toFixed(2)} per player`}
          </div>
          <div className="text-sm">🏆 Prize: ${t.prize_pool / 100}</div>

          <div className="flex gap-2 mt-2">
            {t.entry_fee === 0 && (
              <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
                Free Entry
              </span>
            )}
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                t.status === "Upcoming"
                  ? "bg-green-100 text-green-800"
                  : t.status === "Ongoing"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {t.status}
            </span>
          </div>

          <div className="mt-2">
            <a
              href={`/tournaments/${t.id}`}
              className="inline-block px-4 py-1 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700"
            >
              View Details
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
