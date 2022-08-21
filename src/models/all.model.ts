export interface ITeam {
  id: number;
  name: string;
  shortName: string;
}

export interface IGame {
  id: number;
  roundId: number;
  team1: number | undefined;
  team2: number | undefined;
}

export interface IRound {
  id: number;
  startTime: string;
  endTime: string;
  game1: IGame;
  game2: IGame;
  game3: IGame;
}

export interface ISchedule {
  rounds: IRound[];
}
