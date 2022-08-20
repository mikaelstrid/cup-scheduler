import React from "react";
import { DataService } from "../services/data.service";
import Game from "./Game";

function Schedule() {
  const teams = DataService.getTeams();
  const schedule = DataService.getSchedule();

  return (
    <>
      <h2>Spelschema</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th></th>
            <th>Plan 1</th>
            <th>Plan 2</th>
            <th>Plan 3</th>
          </tr>
        </thead>
        <tbody>
          {schedule.rounds.map((round) => (
            <tr>
              <th>Runda {round.id}</th>
              <td>
                <Game game={round.field1} teams={teams}></Game>
              </td>
              <td>
                <Game game={round.field2} teams={teams}></Game>
              </td>
              <td>
                <Game game={round.field3} teams={teams}></Game>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Schedule;
