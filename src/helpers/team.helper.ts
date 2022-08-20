import { ITeam } from "../models/all.model";

export class TeamHelper {
  public static getTeamName(
    teamId: number | undefined,
    teams: ITeam[]
  ): string | undefined {
    return teams.find((team) => team.id === teamId)?.name;
  }
}
