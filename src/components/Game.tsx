import React from "react";
import { IGame, ITeam } from "../models/all.model";
import { DataService } from "../services/data.service";

function Game({ game, teams }: { game: IGame; teams: ITeam[] }) {
  function handleTeamChanged(teamNumber: number, newTeamId: number): void {
    const updatedGame = {
      id: game.id,
      team1: teamNumber === 1 ? newTeamId : game.team1,
      team2: teamNumber === 2 ? newTeamId : game.team2,
    };
    DataService.updateGame(updatedGame);
  }

  return (
    <div className="d-flex flex-row flex-wrap">
      <Team
        selectedTeam={game.team1}
        teams={teams}
        handleSelectedTeamChanged={(e) => handleTeamChanged(1, e)}
      ></Team>{" "}
      <span>vs</span>{" "}
      <Team
        selectedTeam={game.team2}
        teams={teams}
        handleSelectedTeamChanged={(e) => handleTeamChanged(2, e)}
      ></Team>
    </div>
  );
}

function Team({
  selectedTeam,
  teams,
  handleSelectedTeamChanged,
}: {
  selectedTeam: number | undefined;
  teams: ITeam[];
  handleSelectedTeamChanged: (value: number) => void;
}) {
  return (
    <select
      className="form-select"
      defaultValue={selectedTeam}
      onChange={(e) => handleSelectedTeamChanged(parseInt(e.target.value))}
    >
      <option value={-1}>- Välj lag -</option>
      {teams.map((team) => (
        <option key={`${team.id}`} value={team.id}>
          {team.shortName}
        </option>
      ))}
    </select>
  );
}

export default Game;
