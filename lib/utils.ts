export const makeClassList = (
  arr: (string | undefined)[]
): string | undefined =>
  !arr || arr?.length === 0 ? undefined : arr?.filter(Boolean).join(" ");
