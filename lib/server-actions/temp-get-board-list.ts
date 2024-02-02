"use server";

import { I_BoardModel } from "../models/Board";

export const tempGetData = async (): Promise<I_BoardModel[] | null> => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          _id: "b1",
          author: "65b938faa4d416808b20e67a",
          name: "Platform Lunch",
          slug: "65b938faa4d416808b20e67a-platform-lunch",
        },
        {
          _id: "b2",
          author: "65b938faa4d416808b20e67a",
          name: "Marketing Plan",
          slug: "65b938faa4d416808b20e67a-markering-plan",
        },
        {
          _id: "b3",
          author: "65b938faa4d416808b20e67a",
          name: "Roadmap",
          slug: "65b938faa4d416808b20e67a-roadmap",
        },
      ]);
    }, 2000);
  });
};
