import { db } from "./db";

const getUserByUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username: username,
    },
    include: {
      stream: true,
    },
  });

  return user;
};

const getUserById = async (id: string) => {
  const user = await db.user.findUnique({
    where: {
      id,
    },
    include: {
      stream: true,
    },
  });

  return user;
};
export { getUserByUsername, getUserById };
