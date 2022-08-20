import React from "react";
import { IGame, ITeam } from "../models/all.model";

function Game({ game, teams }: { game: IGame | undefined; teams: ITeam[] }) {
  if (game === undefined) return <span></span>;
  return (
    <div className="d-flex flex-row flex-wrap">
      <Team selectedTeam={game.team1} teams={teams}></Team> <span>vs</span>{" "}
      <Team selectedTeam={game.team2} teams={teams}></Team>
    </div>
  );
}

function Team({
  selectedTeam,
  teams,
}: {
  selectedTeam: number | undefined;
  teams: ITeam[];
}) {
  return (
    <select className="form-select" defaultValue={selectedTeam}>
      {teams.map((team) => (
        <option value={team.id}>{team.shortName}</option>
      ))}
    </select>
  );
}

export default Game;
