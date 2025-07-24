import React from "react";

/**
 * @param {{
 *   form: Object,
 *   handleChange: Function,
 *   handleSubmit: Function
 * }} props
 */
export default function TournamentForm({ form, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Tournament Name"
        maxLength={100}
        value={form.name}
        onChange={handleChange}
        required
        className="w-full p-3 rounded bg-[#2a2a2a] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
        className="w-full p-3 rounded bg-[#2a2a2a] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />

      <input
        type="number"
        name="entry_fee"
        placeholder="Entry Fee (0 for Free)"
        value={form.entry_fee}
        onChange={handleChange}
        className="w-full p-3 rounded bg-[#2a2a2a] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />

      <input
        type="number"
        name="prize_pool"
        placeholder="Prize Pool"
        value={form.prize_pool}
        onChange={handleChange}
        className="w-full p-3 rounded bg-[#2a2a2a] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />

      <input
        type="datetime-local"
        name="start_date"
        value={form.start_date}
        onChange={handleChange}
        required
        className="w-full p-3 rounded bg-[#2a2a2a] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />

      <input
        type="number"
        name="max_teams"
        placeholder="Max Teams"
        value={form.max_teams}
        onChange={handleChange}
        className="w-full p-3 rounded bg-[#2a2a2a] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition-colors duration-200"
      >
        Make
      </button>
    </form>
  );
}
