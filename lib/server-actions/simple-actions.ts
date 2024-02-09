"use server";

import { ObjectId } from "mongodb";
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
    console.log(error);
    return {
      status: 500,
      details: "Unable to get data.",
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
    console.log(error);
    return {
      status: 500,
      details: "Unable to get one.",
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
): Promise<
  Omit<I_ServerActionResponse, "data"> & {
    data?: { insertedIds: { [key: number]: string } };
  }
> => {
  const { client, db } = await getClient();
  try {
    const coll = db.collection(collName);
    const result = await coll.insertMany(docs, options);

    if (!result.acknowledged || !result.insertedIds) {
      return { status: 500, details: "Unable to save data. Try again." };
    }

    return {
      status: 201,
      data: { insertedIds: JSON.parse(JSON.stringify(result.insertedIds)) },
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      details: "Unable to save data. Try again.",
      errorMessage: String(error),
    };
  } finally {
    await client.close();
  }
};

export const updateDocument = async (
  collName: string,
  id: string,
  updated: Object,
  options?: Object
): Promise<Omit<I_ServerActionResponse, "data">> => {
  const { client, db } = await getClient();
  try {
    const coll = db.collection(collName);
    const result = await coll.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: { ...updated },
      },
      options
    );

    if (result.matchedCount === 0) {
      console.log("matchedCount is 0");
      return {
        status: 500,
        details: "Unable to update the documnet. Try again.",
      };
    }

    return {
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      details: "Unable to update the documnet. Try again.",
      errorMessage: String(error),
    };
  } finally {
    await client.close();
  }
};

export const deleteDocument = async (
  collName: string,
  docId: string
): Promise<Omit<I_ServerActionResponse, "data">> => {
  const { client, db } = await getClient();
  try {
    const coll = db.collection(collName);
    const result = await coll.deleteOne({ _id: new ObjectId(docId) });

    if (result.deletedCount === 0) {
      console.log("deletedCount is 0");
      return {
        status: 500,
        details: "Unable to remove the documnet. Try again.",
      };
    }

    return {
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      details: "Unable to remove the documnet. Try again.",
      errorMessage: String(error),
    };
  } finally {
    await client.close();
  }
};
