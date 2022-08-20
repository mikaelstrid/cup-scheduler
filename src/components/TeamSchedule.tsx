import React from "react";
import { ScheduleHelper } from "../helpers/schedule.helper";
import { TeamHelper } from "../helpers/team.helper";
import { ITeam } from "../models/all.model";
import { DataService } from "../services/data.service";

function TeamSchedule({ team }: { team: ITeam }) {
  const teams = DataService.getTeams();
  const schedule = DataService.getSchedule();

  return (
    <>
      <h3 key={team.shortName}>
        {team.name} ({ScheduleHelper.getGames(team.id, schedule).length})
      </h3>
      {schedule.rounds.map((round) =>
        [round.field1, round.field2, round.field3]
          .filter((game) => game?.team1 === team.id || game?.team2 === team.id)
          .map((game) => (
            <div>
              Runda {round.id}: {TeamHelper.getTeamName(game?.team1, teams)} vs{" "}
              {TeamHelper.getTeamName(game?.team2, teams)}
            </div>
          ))
      )}
    </>
  );
}

export default TeamSchedule;
