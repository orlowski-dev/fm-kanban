"use server";

import getClient from "../db/getClient";
import { I_Column } from "../models/Column";
import { I_Task } from "../models/Task";

export interface I_GetColumns_And_Tasks
  extends Omit<I_ServerActionResponse, "data"> {
  data?: { columns: I_Column[]; tasks?: I_Task[] } | null;
}

const getColumnsAndTasks = async (
  boardID: string
): Promise<I_GetColumns_And_Tasks> => {
  const { client, db } = await getClient();

  try {
    // get columns
    const columnsColl = db.collection<I_Column>("columns");

    if ((await columnsColl.countDocuments({ board: boardID })) === 0) {
      return { status: 200, data: null };
    }

    const columnsCursor = columnsColl.find({ board: boardID });

    const columns: I_Column[] = [];

    for await (const doc of columnsCursor) {
      columns.push(doc);
    }

    // get tasks
    const tasksColl = db.collection<I_Task>("tasks");

    if ((await tasksColl.countDocuments({})) === 0) {
      return { status: 200, data: JSON.parse(JSON.stringify({ columns })) };
    }
    const collsIDs = columns.map((column) => ({
      column: column._id.toString(),
    }));
    const tasksCursor = tasksColl.find({ $or: [...collsIDs] });
    const tasks: I_Task[] = [];

    for await (const doc of tasksCursor) {
      tasks.push(doc);
    }

    return {
      status: 200,
      data: JSON.parse(JSON.stringify({ columns, tasks })),
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      detail: "Unable to get columns and tasks",
      errorMessage: String(error),
    };
  } finally {
    await client.close();
  }
};

export default getColumnsAndTasks;
