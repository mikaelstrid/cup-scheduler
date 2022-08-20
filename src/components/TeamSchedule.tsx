import React from "react";
import { ScheduleHelper } from "../helpers/schedule.helper";
import { TeamHelper } from "../helpers/team.helper";
import { ISchedule, ITeam } from "../models/all.model";
import { DataService } from "../services/data.service";

function TeamSchedule({
  team,
  schedule,
}: {
  team: ITeam;
  schedule: ISchedule | undefined;
}) {
  const teams = DataService.getTeams();

  if (!schedule) return <p>Laddar...</p>;

  return (
    <>
      <h3 key={team.shortName}>
        {team.name} ({ScheduleHelper.getGames(team.id, schedule).length})
      </h3>
      {schedule.rounds.map((round) =>
        [round.game1, round.game2, round.game3]
          .filter((game) => game?.team1 === team.id || game?.team2 === team.id)
          .map((game) => (
            <div key={round.id}>
              Runda {round.id}: {TeamHelper.getTeamName(game?.team1, teams)} vs{" "}
              {TeamHelper.getTeamName(game?.team2, teams)}
            </div>
          ))
      )}
    </>
  );
}

export default TeamSchedule;
