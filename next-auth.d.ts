import type { I_UserModel } from "./lib/models/User";
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: I_UserModel & Omit<DefaultSession>;
  }

  interface User extends DefaultUser, I_UserModel {}
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT, I_UserModel {}
}
