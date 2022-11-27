// Generated by joist-codegen (hash=2d96d2.897)
export enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE",
}

export type ColorDetails = { id: number; code: Color; name: string };

const details: Record<Color, ColorDetails> = {
  [Color.Red]: { id: 1, code: Color.Red, name: "Red" },
  [Color.Green]: { id: 2, code: Color.Green, name: "Green" },
  [Color.Blue]: { id: 3, code: Color.Blue, name: "Blue" },
};

export const Colors = {
  getByCode(code: Color): ColorDetails {
    return details[code];
  },

  findByCode(code: string): ColorDetails | undefined {
    return details[code as Color];
  },

  findById(id: number): ColorDetails | undefined {
    return Object.values(details).find((d) => d.id === id);
  },

  getValues(): ReadonlyArray<Color> {
    return Object.values(Color);
  },

  getDetails(): ReadonlyArray<ColorDetails> {
    return Object.values(details);
  },
};
