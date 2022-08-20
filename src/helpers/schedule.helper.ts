import { IGame, IRound, ISchedule, ITeam } from "../models/all.model";

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
        ScheduleHelper.getGamesInRound(round).filter(
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
      .map((game) => ScheduleHelper.getTeamsInGame(game))
      .flat()
      .filter((x) => x !== undefined)
      .map((x) => x as number)
      .filter((x) => x !== teamId);
  }

  public static getEligibleOpponents(
    slotNumber: number,
    game: IGame,
    teams: ITeam[],
    schedule: ISchedule
  ): number[] {
    let result = teams;

    const teamSelectedInOtherSlot = slotNumber === 1 ? game.team2 : game.team1;

    if (teamSelectedInOtherSlot) {
      // // Remove the team selected in the other slot
      // result = teams.filter((team) => team.id !== teamSelectedInOtherSlot);

      // Remove all current opponents
      result = result.filter(
        (team) =>
          this.getOpponents(teamSelectedInOtherSlot, schedule).indexOf(
            team.id
          ) === -1
      );
    }

    // Remove teams that already play in this round
    const teamsInRound = this.getGamesInRound(
      schedule.rounds.find((round) => round.id === game.roundId) as IRound
    )
      .map((game) => this.getTeamsInGame(game))
      .flat();
    result = result.filter((team) => teamsInRound.indexOf(team.id) === -1);

    return result.map((team) => team.id);
  }

  private static getGamesInRound(round: IRound): IGame[] {
    return [round.game1, round.game2, round.game3];
  }

  private static getTeamsInGame(game: IGame): number[] {
    return [game.team1, game.team2]
      .filter((team) => team !== undefined)
      .map((team) => team as number);
  }
}
