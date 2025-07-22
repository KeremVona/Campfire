export default function GameInfo({ game, isHost, onDelete }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{game.title}</h1>
      {isHost && (
        <button
          onClick={onDelete}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete Game
        </button>
      )}
      <p>
        <span className="font-semibold">Host:</span> {game.host_name}
      </p>
      <p>
        <span className="font-semibold">Description:</span> {game.description}
      </p>
      <p>
        <span className="font-semibold">Max Players:</span> {game.max_players}
      </p>
      <p>
        <span className="font-semibold">Start Time:</span>{" "}
        {new Date(game.start_time).toLocaleString()}
      </p>
      <p>
        <span className="font-semibold">Status:</span> {game.status}
      </p>
      <p>
        <span className="font-semibold">Ranked:</span>{" "}
        {game.is_ranked ? "Yes" : "No"}
      </p>
      <p>
        <span className="font-semibold">Discord Invite:</span>{" "}
        {game.invite || "None"}
      </p>
    </div>
  );
}
