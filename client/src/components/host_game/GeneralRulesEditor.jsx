export default function GeneralRulesEditor({
  generalRules,
  newGeneralRule,
  setNewGeneralRule,
  setGeneralRules,
  editGeneralIndex,
  setEditGeneralIndex,
  editGeneralValue,
  setEditGeneralValue,
}) {
  const addRule = () => {
    if (newGeneralRule.trim() !== "") {
      setGeneralRules([...generalRules, newGeneralRule.trim()]);
      setNewGeneralRule("");
    }
  };

  const removeRule = (indexToRemove) => {
    setGeneralRules((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div>
      <label className="block font-semibold mb-2">📋 General Rules:</label>
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          placeholder="Enter a general rule"
          className="bg-gray-800 border border-gray-700 p-2 w-full rounded text-white placeholder-gray-400"
          value={newGeneralRule}
          onChange={(e) => setNewGeneralRule(e.target.value)}
        />
        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded transition"
          onClick={addRule}
        >
          Add
        </button>
      </div>

      {generalRules.map((rule, index) => (
        <div key={index} className="flex items-center gap-2 mb-1">
          {editGeneralIndex === index ? (
            <>
              <input
                type="text"
                value={editGeneralValue}
                onChange={(e) => setEditGeneralValue(e.target.value)}
                className="bg-gray-800 border border-gray-700 p-1 flex-1 rounded text-white"
              />
              <button
                className="text-green-400 text-xs"
                onClick={() => {
                  const updated = [...generalRules];
                  updated[index] = editGeneralValue;
                  setGeneralRules(updated);
                  setEditGeneralIndex(null);
                  setEditGeneralValue("");
                }}
              >
                Save
              </button>
              <button
                className="text-gray-400 text-xs"
                onClick={() => {
                  setEditGeneralIndex(null);
                  setEditGeneralValue("");
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <span className="flex-1 text-gray-300">{rule}</span>
              <button
                className="text-blue-400 text-xs"
                onClick={() => {
                  setEditGeneralIndex(index);
                  setEditGeneralValue(rule);
                }}
              >
                Edit
              </button>
              <button
                className="text-red-400 text-xs"
                onClick={() => removeRule(index)}
              >
                Remove
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
