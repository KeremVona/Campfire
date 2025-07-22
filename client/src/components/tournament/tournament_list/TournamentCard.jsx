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
    <div className="p-4 bg-white rounded-2xl shadow-md space-y-2">
      <div className="text-xl font-semibold">{name}</div>
      <div className="text-gray-600">{description}</div>
      <div className="text-sm text-gray-500">🗓 {formatDate(start_date)}</div>
      <div className="text-sm text-gray-500">
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
          <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
            Free Entry
          </span>
        )}
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            status === "Upcoming"
              ? "bg-green-100 text-green-800"
              : status === "Ongoing"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="mt-2">
        <a
          href={`/tournaments/${id}`}
          className="inline-block px-4 py-1 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700"
        >
          View Details
        </a>
      </div>
    </div>
  );
}
