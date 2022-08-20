import { IGame, ISchedule } from "../models/all.model";

export class ScheduleHelper {
  public static getGames(teamId: number, schedule: ISchedule): IGame[] {
    return schedule.rounds
      .map((round) =>
        [round.field1, round.field2, round.field3]
          .filter((game) => game !== undefined)
          .map((game) => game as IGame)
          .filter((game) => game.team1 === teamId || game.team2 === teamId)
      )
      .flat();
  }

  public static getOpponents(teamId: number, schedule: ISchedule): number[] {
    return ScheduleHelper.getGames(teamId, schedule)
      .map((game) => [game.team1, game.team2])
      .flat()
      .filter((x) => x !== teamId);
  }
}
