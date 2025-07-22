import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GameFormFields from "../components/host_game/GameFormFields";
import GeneralRulesEditor from "../components/host_game/GeneralRulesEditor";
import CountryRulesEditor from "../components/host_game/CountryRulesEditor";

export default function HostGame() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    max_players: 10,
    is_ranked: false,
    invite: "",
    start_time: "",
  });
  const [generalRules, setGeneralRules] = useState([]);
  const [newGeneralRule, setNewGeneralRule] = useState("");
  const [editGeneralIndex, setEditGeneralIndex] = useState(null);
  const [editGeneralValue, setEditGeneralValue] = useState("");

  const [countryRules, setCountryRules] = useState([]);
  const [newCountryRule, setNewCountryRule] = useState({
    country: "",
    description: "",
  });
  const [editCountryIndex, setEditCountryIndex] = useState(null);
  const [editCountryValue, setEditCountryValue] = useState({
    country: "",
    description: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/games",
        {
          ...form,
          generalRules,
          countryRules,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Game made successfully! Navigating you to the game");
      setTimeout(() => {
        navigate(`/games/${res.data.id}`);
      }, 1000);
    } catch (err) {
      console.error(err);
      setMessage("Failed to make game.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Host a Game</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <GameFormFields form={form} handleChange={handleChange} />
        <GeneralRulesEditor
          {...{
            generalRules,
            newGeneralRule,
            setNewGeneralRule,
            setGeneralRules,
            editGeneralIndex,
            setEditGeneralIndex,
            editGeneralValue,
            setEditGeneralValue,
          }}
        />
        <CountryRulesEditor
          {...{
            countryRules,
            setCountryRules,
            newCountryRule,
            setNewCountryRule,
            editCountryIndex,
            setEditCountryIndex,
            editCountryValue,
            setEditCountryValue,
          }}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Host Game
        </button>
        {message && <p className="text-red-500">{message}</p>}
      </form>
    </div>
  );
}
