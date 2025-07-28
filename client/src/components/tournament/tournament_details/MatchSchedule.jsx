import React from "react";

export default function MatchSchedule({ matches, user }) {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold">Match Schedule</h2>
      {matches.map((match) => (
        <div key={match.id} className="border p-2 rounded mb-2">
          <div>
            {match.team1_name} vs {match.team2_name}
          </div>
          <div className="text-sm text-gray-500">
            Scheduled for: {new Date(match.start_time).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}
