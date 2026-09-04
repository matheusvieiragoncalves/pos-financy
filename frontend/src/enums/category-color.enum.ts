export enum CategoryColorEnum {
  BLUE = "BLUE",
  PINK = "PINK",
  ORANGE = "ORANGE",
  GREEN = "GREEN",
  PURPLE = "PURPLE",
  RED = "RED",
  YELLOW = "YELLOW",
}

export const CATEGORY_COLOR_MAP: Record<
  CategoryColorEnum,
  { bg: string; text: string; base?: string }
> = {
  [CategoryColorEnum.GREEN]: {
    bg: "bg-green-light",
    text: "text-green-base",
    base: "green-base",
  },

  [CategoryColorEnum.BLUE]: {
    bg: "bg-blue-light",
    text: "text-blue-base",
    base: "blue-base",
  },

  [CategoryColorEnum.PURPLE]: {
    bg: "bg-purple-light",
    text: "text-purple-base",
    base: "purple-base",
  },

  [CategoryColorEnum.PINK]: {
    bg: "bg-pink-light",
    text: "text-pink-base",
    base: "pink-base",
  },
  [CategoryColorEnum.RED]: {
    bg: "bg-red-light",
    text: "text-red-base",
    base: "red-base",
  },

  [CategoryColorEnum.ORANGE]: {
    bg: "bg-orange-light",
    text: "text-orange-base",
    base: "orange-base",
  },

  [CategoryColorEnum.YELLOW]: {
    bg: "bg-yellow-light",
    text: "text-yellow-base",
    base: "yellow-base",
  },
}
