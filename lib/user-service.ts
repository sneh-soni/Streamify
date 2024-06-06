import { db } from "./db";

const getUserByUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username: username,
    },
  });

  return user;
};

export { getUserByUsername };
