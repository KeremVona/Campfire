export default function PlayerList({ players, isHost, userId, onKick }) {
  return (
    <ul className="mt-4 text-white">
      {players.map((player) => (
        <div key={player.id} className="flex">
          <li className="mr-2">👤 {player.username}</li>
          {isHost && player.id !== userId && (
            <button
              onClick={() => onKick(player.id)}
              className="text-red-500 hover:underline"
            >
              Kick
            </button>
          )}
        </div>
      ))}
    </ul>
  );
}
