"use server";

import getClient from "../db/getClient";

export const getData = async (
  collName: string,
  query?: Object,
  options?: Object
): Promise<I_ServerActionResponse> => {
  const { client, db } = await getClient();
  try {
    const coll = db.collection(collName);
    const cursor = coll.find(query ?? {}, options);

    const data = [];

    for await (const doc of cursor) {
      data.push(doc);
    }

    return {
      status: 200,
      data: data.length === 0 ? null : JSON.parse(JSON.stringify(data)),
    };
  } catch (error) {
    return {
      status: 500,
      detail: "Unable to get data.",
      errorMessage: String(error),
    };
  } finally {
    await client.close();
  }
};

export const getOne = async (
  collName: string,
  query?: Object,
  options?: Object
): Promise<I_ServerActionResponse> => {
  const { client, db } = await getClient();
  try {
    const coll = db.collection(collName);
    const cursor = await coll.findOne(query ?? {}, options);

    return { status: 200, data: JSON.parse(JSON.stringify(cursor)) };
  } catch (error) {
    return {
      status: 500,
      detail: "Unable to get one.",
      errorMessage: String(error),
    };
  } finally {
    await client.close();
  }
};

export const saveData = async (
  collName: string,
  docs: Object[],
  options?: Object
): Promise<I_ServerActionResponse> => {
  const { client, db } = await getClient();
  try {
    const coll = db.collection(collName);
    const result = await coll.insertMany(docs, options);

    if (!result.acknowledged || !result.insertedIds) {
      return { status: 500, detail: "Unable to save data. Try again." };
    }

    return {
      status: 201,
      data: { insertedIds: JSON.parse(JSON.stringify(result.insertedIds)) },
    };
  } catch (error) {
    return {
      status: 500,
      detail: "Unable to save data. Try again.",
      errorMessage: String(error),
    };
  } finally {
    await client.close();
  }
};
