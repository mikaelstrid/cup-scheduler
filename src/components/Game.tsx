import React from "react";
import { ScheduleHelper } from "../helpers/schedule.helper";
import { IGame, ISchedule, ITeam } from "../models/all.model";
import { DataService } from "../services/data.service";
import { TeamHelper } from "../helpers/team.helper";

function Game({
  editMode,
  game,
  teams,
  schedule,
}: {
  editMode: boolean;
  game: IGame;
  teams: ITeam[];
  schedule: ISchedule;
}) {
  if (!editMode)
    return (
      <span>
        {TeamHelper.getTeamName(game.team1, teams)} vs{" "}
        {TeamHelper.getTeamName(game.team2, teams)}
      </span>
    );

  function handleTeamChanged(teamNumber: number, newTeamId: number): void {
    const updatedGame = {
      id: game.id,
      roundId: game.roundId,
      team1:
        teamNumber === 1
          ? newTeamId !== -1
            ? newTeamId
            : undefined
          : game.team1,
      team2:
        teamNumber === 2
          ? newTeamId !== -1
            ? newTeamId
            : undefined
          : game.team2,
    };
    DataService.updateGame(updatedGame);
  }

  const eligibleTeamsSlot1 = ScheduleHelper.getEligibleOpponents(
    1,
    game,
    teams,
    schedule
  );
  const eligibleTeamsSlot2 = ScheduleHelper.getEligibleOpponents(
    2,
    game,
    teams,
    schedule
  );

  return (
    <div className="d-flex flex-nowrap align-items-center">
      <Team
        selectedTeam={game.team1}
        teams={teams}
        eligibleTeams={eligibleTeamsSlot1}
        handleSelectedTeamChanged={(e) => handleTeamChanged(1, e)}
      ></Team>{" "}
      <span className="mx-1">vs</span>{" "}
      <Team
        selectedTeam={game.team2}
        teams={teams}
        eligibleTeams={eligibleTeamsSlot2}
        handleSelectedTeamChanged={(e) => handleTeamChanged(2, e)}
      ></Team>
    </div>
  );
}

function Team({
  selectedTeam,
  teams,
  eligibleTeams,
  handleSelectedTeamChanged,
}: {
  selectedTeam: number | undefined;
  teams: ITeam[];
  eligibleTeams: number[];
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
        <option
          key={`${team.id}`}
          value={team.id}
          disabled={eligibleTeams.indexOf(team.id) === -1}
        >
          {team.shortName}
        </option>
      ))}
    </select>
  );
}

export default Game;
