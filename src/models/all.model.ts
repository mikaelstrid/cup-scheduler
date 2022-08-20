export interface ITeam {
  id: number;
  name: string;
  shortName: string;
}

export interface IGame {
  id: number;
  team1: number;
  team2: number;
}

export interface IRound {
  id: number;
  field1: IGame | undefined;
  field2: IGame | undefined;
  field3: IGame | undefined;
}

export interface ISchedule {
  rounds: IRound[];
}
