import { ISchedule, ITeam } from "../models/all.model";

export class DataService {
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

  public static getSchedule(): ISchedule {
    return {
      rounds: [
        {
          id: 1,
          field1: { id: 1, team1: 1, team2: 14 },
          field2: { id: 2, team1: 3, team2: 14 },
          field3: undefined,
        },
        {
          id: 2,
          field1: undefined,
          field2: undefined,
          field3: { id: 6, team1: 5, team2: 6 },
        },
      ],
    };
  }
}
