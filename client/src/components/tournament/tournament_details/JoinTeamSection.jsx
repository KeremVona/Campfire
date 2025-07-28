import React from "react";

export default function JoinTeamSection({ team, tournament }) {
  return (
    <div className="mt-4">
      {!team ? (
        <button className="px-4 py-2 bg-green-600 text-white rounded">
          Join a Team
        </button>
      ) : (
        <div className="text-sm text-gray-700">
          You’re already in <strong>{team.name}</strong>.
        </div>
      )}
    </div>
  );
}
