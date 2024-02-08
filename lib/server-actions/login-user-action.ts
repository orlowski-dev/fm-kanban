"use server";

import getClient from "../db/getClient";
import { compare } from "bcryptjs";

interface I_LoginData {
  email: string;
  password: string;
}

const loginUserAction = async (
  data: I_LoginData
): Promise<I_ServerActionResponse> => {
  const { client, db } = await getClient();
  try {
    const coll = db.collection("users");

    // get user by email
    const user = await coll.findOne({ email: data.email });

    // if user doesnt exist or password is incorrect
    if (!user || !(await compare(data.password, user.password))) {
      return {
        status: 401,
        details: "Wrong email address or/and password. Try again.",
      };
    }

    return {
      status: 200,
      details: "Authorized",
      data: user,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      details: "Something went wrong. Try again.",
      errorMessage: String(error),
    };
  } finally {
    await client.close();
  }
};

export default loginUserAction;
