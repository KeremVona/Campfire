import React from "react";

export default function OrganizerControls({ tournament, teams, matches }) {
  return (
    <div className="mt-6 bg-gray-800 text-white p-4 rounded">
      <h2 className="text-xl font-semibold">Organizer Controls</h2>
      <button className="mt-2 px-4 py-2 bg-red-500 rounded">
        Edit Matches
      </button>
      {/* Add more controls like match generation, kicking, deleting */}
    </div>
  );
}
