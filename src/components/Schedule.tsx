import React from "react";
import { ISchedule } from "../models/all.model";
import { DataService } from "../services/data.service";
import Game from "./Game";

function Schedule({ schedule }: { schedule: ISchedule | undefined }) {
  const teams = DataService.getTeams();

  if (!schedule) return <p>Laddar...</p>;

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
            <tr key={round.id}>
              <th>Runda {round.id}</th>
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
}

export default Schedule;
