import React from "react";

export default function TeamList({ teams, user, tournament, userTeam }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-200">Teams</h2>

      {teams.length === 0 ? (
        <p className="text-gray-400">No teams have joined yet.</p>
      ) : (
        teams.map((team) => (
          <div
            key={team.id}
            className={`p-4 rounded-xl border shadow-sm transition ${
              userTeam?.id === team.id
                ? "border-blue-500 bg-blue-900/20"
                : "border-gray-700 bg-gray-800"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-white">{team.name}</h3>
              {userTeam?.id === team.id && (
                <span className="text-sm bg-blue-600 text-white px-2 py-1 rounded-full">
                  Your Team
                </span>
              )}
            </div>

            <div className="text-sm text-gray-300">
              {team.members?.length || 0} member
              {team.members?.length === 1 ? "" : "s"}
            </div>

            <ul className="mt-2 list-disc list-inside space-y-1 text-gray-300">
              {team.members?.map((member) => (
                <li key={member.id}>
                  {member.username}
                  {member.id === user?.id && (
                    <span className="ml-2 text-blue-400">(You)</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
