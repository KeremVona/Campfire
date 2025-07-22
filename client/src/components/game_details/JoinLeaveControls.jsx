export default function JoinLeaveControls({ hasJoined, onJoin, onLeave }) {
  return (
    <div className="mt-4">
      {!hasJoined ? (
        <button
          onClick={onJoin}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Join Game
        </button>
      ) : (
        <>
          <p className="text-green-400">You have joined this game!</p>
          <button
            onClick={onLeave}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Leave Game
          </button>
        </>
      )}
    </div>
  );
}
