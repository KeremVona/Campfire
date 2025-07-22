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
      <label className="block font-semibold mb-1">General Rules:</label>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          placeholder="Enter a general rule"
          className="border p-2 w-full"
          value={newGeneralRule}
          onChange={(e) => setNewGeneralRule(e.target.value)}
        />
        <button
          type="button"
          className="bg-blue-500 text-white px-3"
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
                className="border p-1 flex-1"
              />
              <button
                className="text-green-600 text-xs"
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
                className="text-gray-500 text-xs"
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
              <span className="flex-1">{rule}</span>
              <button
                className="text-blue-600 text-xs"
                onClick={() => {
                  setEditGeneralIndex(index);
                  setEditGeneralValue(rule);
                }}
              >
                Edit
              </button>
              <button
                className="text-red-500 text-xs"
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
