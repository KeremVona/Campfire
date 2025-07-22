export default function RuleSection({ generalRules, countryRules }) {
  return (
    <div>
      <div className="mt-6">
        <h2 className="text-xl font-bold">General Rules</h2>
        <ul className="list-disc ml-6">
          {generalRules.map((rule, i) => (
            <li key={i}>{rule}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold">Country Rules</h2>
        <ul className="list-disc ml-6">
          {countryRules.map((rule, i) => (
            <li key={i}>
              <strong>{rule.country}:</strong> {rule.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
