import { IGame, ISchedule } from "../models/all.model";

export class ScheduleHelper {
  public static getGames(
    teamId: number,
    schedule: ISchedule | undefined
  ): IGame[] {
    if (!schedule) {
      return [];
    }
    return schedule.rounds
      .map((round) =>
        [round.game1, round.game2, round.game3].filter(
          (game) => game.team1 === teamId || game.team2 === teamId
        )
      )
      .flat();
  }

  public static getOpponents(
    teamId: number,
    schedule: ISchedule | undefined
  ): number[] {
    return ScheduleHelper.getGames(teamId, schedule)
      .map((game) => [game.team1, game.team2])
      .flat()
      .filter((x) => x !== undefined)
      .map((x) => x as number)
      .filter((x) => x !== teamId);
  }
}
