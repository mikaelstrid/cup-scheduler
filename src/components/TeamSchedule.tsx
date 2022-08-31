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
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Tid</th>
            <th>Match</th>
          </tr>
        </thead>
        <tbody>
          {schedule.rounds.map((round) =>
            [round.game1, round.game2, round.game3]
              .filter(
                (game) => game?.team1 === team.id || game?.team2 === team.id
              )
              .map((game) => (
                <tr key={round.id}>
                  <td>
                    {round.startTime}-{round.endTime}
                  </td>
                  <td>
                    {TeamHelper.getTeamName(game?.team1, teams)} vs{" "}
                    {TeamHelper.getTeamName(game?.team2, teams)}
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </table>
    </>
  );
}

export default TeamSchedule;
