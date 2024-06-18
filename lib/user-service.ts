import { db } from "./db";

const getUserByUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username: username,
    },
    select: {
      id: true,
      username: true,
      bio: true,
      imageUrl: true,
      externalUserId: true,
      stream: {
        select: {
          id: true,
          name: true,
          thumbnailUrl: true,
          isLive: true,
          isChatDelayed: true,
          isChatEnabled: true,
          isChatFollowersOnly: true,
        },
      },
      _count: {
        select: {
          followedBy: true,
        },
      },
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
