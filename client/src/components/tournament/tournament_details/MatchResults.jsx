import React from "react";

export default function MatchResults({ matches }) {
  const completed = matches.filter((m) => m.status === "completed");
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold">Match Results</h2>
      {completed.length === 0 ? (
        <div className="text-gray-500">No completed matches yet.</div>
      ) : (
        completed.map((match) => (
          <div key={match.id} className="border p-2 rounded mb-2">
            {match.team1_name} {match.team1_score} - {match.team2_score}{" "}
            {match.team2_name}
          </div>
        ))
      )}
    </div>
  );
}
