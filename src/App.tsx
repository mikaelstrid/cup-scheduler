import React, { useEffect, useState } from "react";
import GamesPlayed from "./components/GamesPlayed";
import Schedule from "./components/Schedule";
import TeamSchedule from "./components/TeamSchedule";
import VersusTable from "./components/VersusTable";
import { ISchedule } from "./models/all.model";
import { DataService } from "./services/data.service";

function App() {
  const [schedule, setSchedule] = useState<ISchedule>();

  useEffect(() => {
    DataService.loadSchedule();
    setSchedule(DataService.loadSchedule());
  }, []);

  const teams = DataService.getTeams();
  DataService.registerUpdateCallback(() => {
    setSchedule(DataService.loadSchedule());
  });

  return (
    <div className="App">
      <div className="container">
        <h1>Isbjörnscupen</h1>
        <Schedule schedule={schedule}></Schedule>

        <GamesPlayed schedule={schedule}></GamesPlayed>

        <VersusTable schedule={schedule}></VersusTable>

        {teams.map((team) => (
          <TeamSchedule
            key={team.id}
            team={team}
            schedule={schedule}
          ></TeamSchedule>
        ))}
      </div>
    </div>
  );
}

export default App;
