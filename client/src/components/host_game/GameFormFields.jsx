export default function GameFormFields({ form, handleChange }) {
  return (
    <>
      <input
        type="text"
        name="title"
        placeholder="Game Title"
        className="border p-2 w-full"
        value={form.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        className="border p-2 w-full"
        rows={3}
        value={form.description}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="max_players"
        placeholder="Max Players"
        className="border p-2 w-full"
        value={form.max_players}
        onChange={handleChange}
        min={2}
        max={30}
      />

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="is_ranked"
          checked={form.is_ranked}
          onChange={handleChange}
        />
        <span>Ranked Match</span>
      </label>

      <input
        type="text"
        name="invite"
        placeholder="Invite Code (optional)"
        className="border p-2 w-full"
        value={form.invite}
        onChange={handleChange}
      />

      <input
        type="datetime-local"
        name="start_time"
        className="border p-2 w-full"
        value={form.start_time}
        onChange={handleChange}
      />
    </>
  );
}
