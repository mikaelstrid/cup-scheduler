import React from "react";
import Schedule from "./components/Schedule";
import TeamSchedule from "./components/TeamSchedule";
import VersusTable from "./components/VersusTable";
import { DataService } from "./services/data.service";

function App() {
  const teams = DataService.getTeams();

  return (
    <div className="App">
      <div className="container">
        <h1>Isbjörnscupen</h1>
        <Schedule></Schedule>

        <VersusTable></VersusTable>

        {teams.map((team) => (
          <TeamSchedule team={team}></TeamSchedule>
        ))}
      </div>
    </div>
  );
}

export default App;
