import React from "react";
import { ScheduleHelper } from "../helpers/schedule.helper";
import { ISchedule, ITeam } from "../models/all.model";
import { DataService } from "../services/data.service";

function GamesPlayed({ schedule }: { schedule: ISchedule | undefined }) {
  const teams = DataService.getTeams();

  if (!schedule) return <p>Laddar...</p>;

  function getBackgroundColor(team: ITeam): string {
    return ScheduleHelper.getGames(team.id, schedule).length === 8
      ? "green"
      : "";
  }

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          {teams.map((team) => (
            <th key={team.shortName}>{team.shortName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {teams.map((team) => (
            <td
              key={`${team.shortName}`}
              style={{ backgroundColor: getBackgroundColor(team) }}
            >
              {ScheduleHelper.getGames(team.id, schedule).length}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

export default GamesPlayed;
