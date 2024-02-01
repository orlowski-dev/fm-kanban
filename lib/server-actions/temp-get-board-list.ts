"use server";

export const tempGetData = async (): Promise<
  | {
      id: string;
      name: string;
      slug: string;
    }[]
  | null
> => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "123",
          name: "Platform Lunch",
          slug: "65b938faa4d416808b20e67a-platform-lunch",
        },
        {
          id: "456",
          name: "Marketing Plan",
          slug: "65b938faa4d416808b20e67a-markering-plan",
        },
        {
          id: "567",
          name: "Roadmap",
          slug: "65b938faa4d416808b20e67a-roadmap",
        },
      ]);
    }, 2000);
  });
};
