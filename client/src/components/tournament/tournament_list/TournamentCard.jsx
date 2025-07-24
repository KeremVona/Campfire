import React from "react";

export default function TournamentCard({ tournament }) {
  const {
    id,
    name,
    description,
    start_date,
    organizer_name,
    entry_fee,
    prize_pool,
    status,
  } = tournament;

  const formatDate = (timestamp) =>
    new Date(timestamp).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <div className="p-4 bg-gray-900 text-white rounded-2xl shadow-lg space-y-2 border border-gray-800">
      <div className="text-xl font-semibold">{name}</div>
      <div className="text-gray-300">{description}</div>

      <div className="text-sm text-gray-400">🗓 {formatDate(start_date)}</div>
      <div className="text-sm text-gray-400">
        👤 Organizer: {organizer_name}
      </div>

      <div className="text-sm">
        💰 Entry:{" "}
        {entry_fee === 0
          ? "Free"
          : `$${(entry_fee / 100).toFixed(2)} per player`}
      </div>
      <div className="text-sm">🏆 Prize: ${prize_pool / 100}</div>

      <div className="flex gap-2 mt-2">
        {entry_fee === 0 && (
          <span className="text-xs bg-green-800/30 text-green-300 px-2 py-1 rounded-full">
            Free Entry
          </span>
        )}
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            status === "Upcoming"
              ? "bg-green-700/30 text-green-300"
              : status === "Ongoing"
              ? "bg-yellow-700/30 text-yellow-300"
              : "bg-red-700/30 text-red-300"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="mt-2">
        <a
          href={`/tournaments/${id}`}
          className="inline-block px-4 py-1 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
        >
          View Details
        </a>
      </div>
    </div>
  );
}
