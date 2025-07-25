import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TournamentForm from "../../components/tournament/make_tournament/TournamentForm";
import Header from "../../components/ui/Header";

export default function MakeTournament() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    entry_fee: 0,
    prize_pool: 0,
    start_date: "",
    max_teams: 8,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/tournaments", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      navigate("/tournaments");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.error || "Failed to make tournament");
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-xl mx-auto p-6 bg-[#1e1e1e] rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-white">Make Tournament</h2>
        <TournamentForm
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
}
