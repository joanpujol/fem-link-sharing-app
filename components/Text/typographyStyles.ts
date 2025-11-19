export const typography = {
  preset1: 'text-3xl font-bold leading-[150%] font-instrument-sans',
  preset2: 'text-2xl font-bold leading-[150%] font-instrument-sans',
  preset3bold: 'text-xl font-bold leading-[150%] font-instrument-sans',
  preset3semibold:
    'text-base font-semibold leading-[150%] font-instrument-sans', // Heading S
  preset3regular: 'text-base font-normal leading-[150%] font-instrument-sans', // Body M
  preset4: 'text-[12px] font-normal leading-[150%] font-instrument-sans',
} as const;

export type TypographyPreset = keyof typeof typography;
