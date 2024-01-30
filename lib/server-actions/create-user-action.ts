"use server";

import getClient from "@/lib/db/getClient";
import { hash } from "bcryptjs";

export type T_UserFromData = {
  name: string;
  email: string;
  password: string;
};

const createUserAction = async (
  data: T_UserFromData
): Promise<I_ServerActionResponse> => {
  const { client, db } = await getClient();
  try {
    client.connect();
    const coll = db.collection("users");
    // check if user already exists

    const foundUser = await coll.findOne({ email: data.email });
    if (foundUser) {
      return { status: 400, detail: "User already exists." };
    }

    // hash password
    const hashedPassword = await hash(data.password, 8);

    // save new user
    await coll.insertOne({
      ...data,
      password: hashedPassword,
      image: null,
    });

    return { status: 201, detail: "User has been created" };
  } catch (error) {
    return {
      status: 500,
      detail: "Something went wrong. Try again.",
      errorMessage: String(error),
    };
  } finally {
    client.close();
  }
};

export default createUserAction;
