import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import TeamList from "../../components/tournament/tournament_details/TeamList";
import MatchSchedule from "../../components/tournament/tournament_details/MatchSchedule";
import BracketView from "../../components/tournament/tournament_details/Bracketview";
import MatchResults from "../../components/tournament/tournament_details/MatchResults";
import OrganizerControls from "../../components/tournament/tournament_details/OrganizerControls";
import JoinTeamSection from "../../components/tournament/tournament_details/JoinTeamSection";
import ApplyTournament from "../../components/tournament/tournament_details/ApplyTournament";

export default function TournamentDetails() {
  const { id } = useParams(); // tournament id
  const [tournament, setTournament] = useState(null);
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [userTeam, setUserTeam] = useState(null);
  const [isOrganizer, setIsOrganizer] = useState(false);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchTournamentData = async () => {
      const token = localStorage.getItem("token");
      try {
        const t = await axios.get(
          `http://localhost:5000/api/tournaments/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const tm = await axios.get(
          `http://localhost:5000/api/tournaments/${id}/teams`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const match = await axios.get(
          `http://localhost:5000/api/tournaments/${id}/matches`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const me = await axios.get(
          "http://localhost:5000/api/auth/user-information",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setTournament(t.data);
        setTeams(tm.data);
        setMatches(match.data);
        setUser(me.data);
        setIsOrganizer(t.data.organizer_id === me.data.id);

        const myTeam = tm.data.find((team) =>
          team.members.some((m) => m.user_id === me.data.id)
        );
        setUserTeam(myTeam || null);
      } catch (err) {
        console.error("Error fetching data: ", err);
      }
    };

    fetchTournamentData();
  }, [id]);

  if (!tournament) return <div className="text-white">Loading...</div>;

  const statusBadge = tournament.is_active
    ? new Date(tournament.start_date) > new Date()
      ? "Upcoming"
      : "Ongoing"
    : "Completed";

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      {/* 🏆 Overview */}
      <section className="mb-6">
        <h1 className="text-3xl font-bold">{tournament.name}</h1>
        <p className="text-gray-300">{tournament.description}</p>
        <div className="mt-2">
          <p>
            Organized by: <strong>{tournament.organizer_username}</strong>
          </p>
          <p>Prize Pool: ${tournament.prize_pool / 100}</p>
          <p>
            Entry Fee:{" "}
            {tournament.entry_fee === 0
              ? "Free"
              : `$${tournament.entry_fee / 100}`}
          </p>
          <p>
            Teams: {teams.length} / {tournament.max_teams}
          </p>
          <p>Start Date: {new Date(tournament.start_date).toLocaleString()}</p>
          <span className="bg-blue-600 text-white py-1 px-3 rounded-full">
            {statusBadge}
          </span>
        </div>
      </section>

      <button
        onClick={() => setShowModal(true)}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Apply
      </button>

      {showModal && (
        <ApplyTournament
          tournamentId={tournament.id}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* 👥 Teams */}
      <TeamList
        teams={teams}
        user={user}
        tournament={tournament}
        userTeam={userTeam}
      />

      {/* 🧑‍🤝‍🧑 Your Team */}
      {userTeam && <JoinTeamSection team={userTeam} tournament={tournament} />}

      {/* 📅 Match Schedule */}
      {matches.length > 0 && <MatchSchedule matches={matches} user={user} />}

      {/* 📝 Match Results */}
      <MatchResults matches={matches} />

      {/* 📊 Brackets */}
      <BracketView matches={matches} teams={teams} />

      {/* 🛠️ Organizer Controls */}
      {isOrganizer && (
        <OrganizerControls
          tournament={tournament}
          teams={teams}
          matches={matches}
        />
      )}
    </div>
  );
}
