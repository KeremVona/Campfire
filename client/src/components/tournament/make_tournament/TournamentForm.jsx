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
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        name="name"
        placeholder="Tournament Name"
        maxLength={100}
        value={form.name}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        name="entry_fee"
        placeholder="Entry Fee (0 for Free)"
        value={form.entry_fee}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        name="prize_pool"
        placeholder="Prize Pool"
        value={form.prize_pool}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="datetime-local"
        name="start_date"
        value={form.start_date}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        name="max_teams"
        placeholder="Max Teams"
        value={form.max_teams}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Make
      </button>
    </form>
  );
}
