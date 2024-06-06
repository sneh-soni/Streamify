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

export { getSelf };
