export default function GameFormFields({ form, handleChange }) {
  return (
    <>
      <input
        type="text"
        name="title"
        placeholder="Game Title"
        className="bg-gray-800 border border-gray-700 p-2 w-full rounded text-white placeholder-gray-400"
        value={form.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        className="bg-gray-800 border border-gray-700 p-2 w-full rounded text-white placeholder-gray-400"
        rows={3}
        value={form.description}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="max_players"
        placeholder="Max Players"
        className="bg-gray-800 border border-gray-700 p-2 w-full rounded text-white placeholder-gray-400"
        value={form.max_players}
        onChange={handleChange}
        min={2}
        max={30}
      />

      <label className="flex items-center space-x-2 text-sm">
        <input
          type="checkbox"
          name="is_ranked"
          checked={form.is_ranked}
          onChange={handleChange}
          className="accent-green-500"
        />
        <span className="text-gray-300">Ranked Match</span>
      </label>

      <input
        type="text"
        name="invite"
        placeholder="Invite Code (optional)"
        className="bg-gray-800 border border-gray-700 p-2 w-full rounded text-white placeholder-gray-400"
        value={form.invite}
        onChange={handleChange}
      />

      <input
        type="datetime-local"
        name="start_time"
        className="bg-gray-800 border border-gray-700 p-2 w-full rounded text-white"
        value={form.start_time}
        onChange={handleChange}
      />
    </>
  );
}
