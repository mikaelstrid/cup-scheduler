import React from "react";
import { ScheduleHelper } from "../helpers/schedule.helper";
import { ITeam } from "../models/all.model";
import { DataService } from "../services/data.service";

function VersusTable() {
  const teams = DataService.getTeams();
  const schedule = DataService.getSchedule();

  function getBackgroundColor(teamX: ITeam, teamY: ITeam): string {
    if (
      ScheduleHelper.getOpponents(teamX.id, schedule).indexOf(teamY.id) !== -1
    )
      return "green";
    return "";
  }

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th></th>
          {teams.map((x) => (
            <th key={x.shortName}>{x.shortName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {teams.map((teamX) => (
          <tr key={teamX.shortName}>
            <th>{teamX.shortName}</th>
            {teams.map((teamY) => (
              <td
                key={`${teamX.shortName}-${teamY.shortName}`}
                style={{
                  backgroundColor: getBackgroundColor(teamX, teamY),
                }}
              ></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default VersusTable;
