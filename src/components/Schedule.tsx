import React, { useState } from "react";
import { ScheduleHelper } from "../helpers/schedule.helper";
import { ISchedule, ITeam } from "../models/all.model";
import { DataService } from "../services/data.service";
import Game from "./Game";

function Schedule({ schedule }: { schedule: ISchedule | undefined }) {
  const teams = DataService.getTeams();
  const [highlightedTeam, setHighlightedTeam] = useState<number>(-1);

  if (!schedule) return <p>Laddar...</p>;

  return (
    <>
      <h2>Spelschema</h2>
      <div className="mb-3">
        <Team
          selectedValue={highlightedTeam}
          teams={teams}
          handleSelectedTeamChanged={(e) => setHighlightedTeam(e)}
        ></Team>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Runda</th>
            <th>Tid</th>
            <th>Plan 1</th>
            <th>Plan 2</th>
            <th>Plan 3</th>
          </tr>
        </thead>
        <tbody>
          {schedule.rounds.map((round) => (
            <tr
              key={round.id}
              style={{
                backgroundColor: ScheduleHelper.teamPlaysInRound(
                  highlightedTeam,
                  round
                )
                  ? "blueviolet"
                  : "",
              }}
            >
              <th className="align-middle">{round.id}</th>
              <th className="align-middle">
                <span className="text-nowrap">
                  {round.startTime}-{round.endTime}
                </span>
              </th>
              <td>
                <Game
                  game={round.game1}
                  teams={teams}
                  schedule={schedule}
                ></Game>
              </td>
              <td>
                <Game
                  game={round.game2}
                  teams={teams}
                  schedule={schedule}
                ></Game>
              </td>
              <td>
                <Game
                  game={round.game3}
                  teams={teams}
                  schedule={schedule}
                ></Game>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );

  function Team({
    selectedValue,
    teams,
    handleSelectedTeamChanged,
  }: {
    selectedValue: number;
    teams: ITeam[];
    handleSelectedTeamChanged: (value: number) => void;
  }) {
    return (
      <select
        className="form-select"
        onChange={(e) => {
          handleSelectedTeamChanged(parseInt(e.target.value));
        }}
        value={selectedValue.toString()}
      >
        <option value={-1}>- Välj lag -</option>
        {teams.map((team) => (
          <option key={`${team.id}`} value={team.id}>
            {team.name}
          </option>
        ))}
      </select>
    );
  }
}

export default Schedule;
