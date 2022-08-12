export enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE",
}

export type ColorDetails = {
  id: number;
  code: Color;
  name: string;
  isRed: boolean;
  isGreen: boolean;
  isBlue: boolean;
};

const details: Record<Color, ColorDetails> = {
  [Color.Red]: {
    id: 1,
    code: Color.Red,
    name: "Red",
    isRed: true,
    isGreen: false,
    isBlue: false,
  },
  [Color.Green]: {
    id: 2,
    code: Color.Green,
    name: "Green",
    isRed: false,
    isGreen: true,
    isBlue: false,
  },
  [Color.Blue]: {
    id: 3,
    code: Color.Blue,
    name: "Blue",
    isRed: false,
    isGreen: false,
    isBlue: true,
  },
};

export const Colors = {
  Red: details[Color.Red],
  Green: details[Color.Green],
  Blue: details[Color.Blue],

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
