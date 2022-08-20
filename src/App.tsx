import React from "react";
import TeamSchedule from "./components/TeamSchedule";
import VersusTable from "./components/VersusTable";
import { DataService } from "./services/data.service";

function App() {
  const teams = DataService.getTeams();
  // const schedule = DataService.getSchedule();

  return (
    <div className="App">
      <div className="container">
        <VersusTable></VersusTable>

        {teams.map((team) => (
          <TeamSchedule team={team}></TeamSchedule>
        ))}
      </div>
    </div>
  );
}

export default App;
