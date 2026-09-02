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
  { bg: string; text: string }
> = {
  [CategoryColorEnum.BLUE]: { bg: "bg-blue-light", text: "text-blue-base" },
  [CategoryColorEnum.PINK]: { bg: "bg-pink-light", text: "text-pink-base" },
  [CategoryColorEnum.ORANGE]: {
    bg: "bg-orange-light",
    text: "text-orange-base",
  },
  [CategoryColorEnum.GREEN]: { bg: "bg-green-light", text: "text-green-base" },
  [CategoryColorEnum.PURPLE]: {
    bg: "bg-purple-light",
    text: "text-purple-base",
  },
  [CategoryColorEnum.RED]: { bg: "bg-red-light", text: "text-red-base" },
  [CategoryColorEnum.YELLOW]: {
    bg: "bg-yellow-light",
    text: "text-yellow-base",
  },
}
