export default function CountryRulesEditor({
  countryRules,
  setCountryRules,
  newCountryRule,
  setNewCountryRule,
  editCountryIndex,
  setEditCountryIndex,
  editCountryValue,
  setEditCountryValue,
}) {
  const addRule = () => {
    const { country, description } = newCountryRule;
    if (country.trim() && description.trim()) {
      setCountryRules([...countryRules, { country, description }]);
      setNewCountryRule({ country: "", description: "" });
    }
  };

  const removeRule = (indexToRemove) => {
    setCountryRules((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div>
      <label className="block font-semibold mb-2">
        🌐 Country-Specific Rules:
      </label>
      <div className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          placeholder="Country (e.g., GER)"
          className="bg-gray-800 border border-gray-700 p-2 rounded text-white placeholder-gray-400"
          value={newCountryRule.country}
          onChange={(e) =>
            setNewCountryRule({ ...newCountryRule, country: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Description"
          className="bg-gray-800 border border-gray-700 p-2 rounded text-white placeholder-gray-400"
          value={newCountryRule.description}
          onChange={(e) =>
            setNewCountryRule({
              ...newCountryRule,
              description: e.target.value,
            })
          }
        />
        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded w-fit transition"
          onClick={addRule}
        >
          Add
        </button>
      </div>

      {countryRules.map((rule, index) => (
        <div key={index} className="flex items-center gap-2 mb-1">
          {editCountryIndex === index ? (
            <>
              <input
                type="text"
                value={editCountryValue.country}
                onChange={(e) =>
                  setEditCountryValue({
                    ...editCountryValue,
                    country: e.target.value,
                  })
                }
                className="bg-gray-800 border border-gray-700 p-1 w-20 rounded text-white"
              />
              <input
                type="text"
                value={editCountryValue.description}
                onChange={(e) =>
                  setEditCountryValue({
                    ...editCountryValue,
                    description: e.target.value,
                  })
                }
                className="bg-gray-800 border border-gray-700 p-1 flex-1 rounded text-white"
              />
              <button
                className="text-green-400 text-xs"
                onClick={() => {
                  const updated = [...countryRules];
                  updated[index] = { ...editCountryValue };
                  setCountryRules(updated);
                  setEditCountryIndex(null);
                  setEditCountryValue({ country: "", description: "" });
                }}
              >
                Save
              </button>
              <button
                className="text-gray-400 text-xs"
                onClick={() => {
                  setEditCountryIndex(null);
                  setEditCountryValue({ country: "", description: "" });
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <span className="flex-1 text-gray-300">
                <strong>{rule.country}</strong>: {rule.description}
              </span>
              <button
                className="text-blue-400 text-xs"
                onClick={() => {
                  setEditCountryIndex(index);
                  setEditCountryValue(rule);
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
