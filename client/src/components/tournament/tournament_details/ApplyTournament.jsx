import React, { useState } from "react";
import axios from "axios";

export default function ApplyTournament({ tournamentId, onClose }) {
  const [steamURL, setSteamURL] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleApply = async () => {
    setLoading(true);
    try {
      await axios.post(
        `http://localhost:5000/tournaments/${tournamentId}/apply`,
        {
          steam_profile_url: steamURL,
          comment,
        }
      );
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold">Apply to Tournament</h2>
        <input
          type="url"
          className="w-full border p-2 rounded"
          placeholder="Your Steam profile URL"
          value={steamURL}
          onChange={(e) => setSteamURL(e.target.value)}
        />
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Optional comment (e.g. hours played)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-300">
            Cancel
          </button>
          <button
            onClick={handleApply}
            disabled={loading}
            className="px-4 py-2 rounded bg-blue-600 text-white"
          >
            {loading ? "Applying..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
