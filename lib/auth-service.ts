import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";

const getSelf = async () => {
  const clerkUser = await currentUser();

  if (!clerkUser || !clerkUser.id) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: {
      externalUserId: clerkUser.id,
    },
  });

  if (!user) throw new Error("Not Found");

  return user;
};

const getSelfByUsername = async (username: string) => {
  const self = await currentUser();

  if (!self || !self.id) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) throw new Error("User Not Found");

  if (self.username !== user.username) throw new Error("Unauthorized");

  return user;
};

export { getSelf, getSelfByUsername };
