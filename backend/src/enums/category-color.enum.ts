export enum CategoryColorEnum {
  BLUE = 'BLUE',
  PINK = 'PINK',
  ORANGE = 'ORANGE',
  GREEN = 'GREEN',
  PURPLE = 'PURPLE',
  RED = 'RED',
  YELLOW = 'YELLOW'
}

export const CATEGORY_COLOR_HEX_MAP: Record<CategoryColorEnum, string> = {
  [CategoryColorEnum.BLUE]: '#2563EB',
  [CategoryColorEnum.PINK]: '#DB2777',
  [CategoryColorEnum.ORANGE]: '#EA580C',
  [CategoryColorEnum.GREEN]: '#16A34A',
  [CategoryColorEnum.PURPLE]: '#9333EA',
  [CategoryColorEnum.RED]: '#DC2626',
  [CategoryColorEnum.YELLOW]: '#CA8A04'
};
