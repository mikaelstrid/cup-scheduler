import { IGame, IRound, ISchedule, ITeam } from "../models/all.model";

export class DataService {
  private static callbackFn: () => void;

  public static getTeams(): ITeam[] {
    return [
      { id: 1, name: "Kållered 1", shortName: "KSK 1" },
      { id: 2, name: "Kållered 2", shortName: "KSK 2" },
      { id: 3, name: "Kållered 2", shortName: "KSK 3" },
      { id: 4, name: "Borås 1", shortName: "BOR 1" },
      { id: 5, name: "Borås 2", shortName: "BOR 2" },
      { id: 6, name: "Frölunda", shortName: "FRÖ" },
      { id: 7, name: "Lerum 1", shortName: "LER 1" },
      { id: 8, name: "Lerum 2", shortName: "LER 2" },
      { id: 9, name: "Manglerud 1", shortName: "MAN 1" },
      { id: 10, name: "Manglerud 2", shortName: " MAN 2" },
      { id: 11, name: "Varberg 1", shortName: "VAR 1" },
      { id: 12, name: "Varberg 2", shortName: "VAR 2" },
      { id: 13, name: "Vänersborg 1", shortName: "VÄN 1" },
      { id: 14, name: "Vänersborg 2", shortName: "VÄN 2" },
    ];
  }

  public static registerUpdateCallback(callbackFn: () => void): void {
    DataService.callbackFn = callbackFn;
  }

  public static updateGame(game: IGame): void {
    const schedule = DataService.loadSchedule();
    for (let i = 0; i < schedule.rounds.length; i++) {
      const round = schedule.rounds[i];
      if (round.game1.id === game.id) {
        round.game1 = game;
        break;
      }
      if (round.game2.id === game.id) {
        round.game2 = game;
        break;
      }
      if (round.game3.id === game.id) {
        round.game3 = game;
        break;
      }
    }
    DataService.saveSchedule(schedule);
    if (DataService.callbackFn) DataService.callbackFn();
  }

  public static loadSchedule(): ISchedule {
    try {
      const temp = localStorage.getItem("kit.schedule");
      if (!temp) {
        console.log("No data found");
        return this.createEmptySchedule();
      }
      return JSON.parse(temp);
    } catch {
      console.log("Could not load schedule");
      return this.createEmptySchedule();
    }
  }

  public static saveSchedule(schedule: ISchedule): void {
    localStorage.setItem("kit.schedule", JSON.stringify(schedule));
  }

  private static createEmptySchedule(): ISchedule {
    const temp: IRound[] = [];
    for (let i = 1; i <= 9; i++) {
      temp.push({
        id: i,
        game1: {
          id: (i - 1) * 3 + 1,
          roundId: i,
          team1: undefined,
          team2: undefined,
        },
        game2: {
          id: (i - 1) * 3 + 2,
          roundId: i,
          team1: undefined,
          team2: undefined,
        },
        game3: {
          id: (i - 1) * 3 + 3,
          roundId: i,
          team1: undefined,
          team2: undefined,
        },
      });
    }
    return { rounds: temp };
  }
}
