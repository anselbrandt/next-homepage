interface UseGetBinsProps {
  target: number;
  range: [number, number, number];
}

export const useGetBins = ({ target, range }: UseGetBinsProps) => {
  const bins = [
    ...[
      ...range.sort((a, b) => b - a).map((value) => 1 + value),

      1,
      ...range.sort((a, b) => a - b).map((value) => 1 - value),
      0,
    ],
  ].map((value) => value * target);
  return { bins };
};
