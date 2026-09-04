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
  { bg: string; text: string; bgBase?: string }
> = {
  [CategoryColorEnum.GREEN]: {
    bg: "bg-green-light",
    text: "text-green-base",
    bgBase: "bg-green-base",
  },

  [CategoryColorEnum.BLUE]: {
    bg: "bg-blue-light",
    text: "text-blue-base",
    bgBase: "bg-blue-base",
  },

  [CategoryColorEnum.PURPLE]: {
    bg: "bg-purple-light",
    text: "text-purple-base",
    bgBase: "bg-purple-base",
  },

  [CategoryColorEnum.PINK]: {
    bg: "bg-pink-light",
    text: "text-pink-base",
    bgBase: "bg-pink-base",
  },
  [CategoryColorEnum.RED]: {
    bg: "bg-red-light",
    text: "text-red-base",
    bgBase: "bg-red-base",
  },

  [CategoryColorEnum.ORANGE]: {
    bg: "bg-orange-light",
    text: "text-orange-base",
    bgBase: "bg-orange-base",
  },

  [CategoryColorEnum.YELLOW]: {
    bg: "bg-yellow-light",
    text: "text-yellow-base",
    bgBase: "bg-yellow-base",
  },
}
