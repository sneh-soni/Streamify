"use server";

import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { getStreamByUserId } from "@/lib/stream-service";
import { Stream } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface UpdateStreamProps {
  values: Partial<Stream>;
}

const updateStream = async ({ values }: UpdateStreamProps) => {
  try {
    const self = await getSelf();
    const selfStream = await getStreamByUserId(self.id);

    if (!selfStream) throw new Error("Stream not found");

    const validData = {
      name: values.name,
      thumbnailUrl: values.thumbnailUrl,
      isChatEnabled: values.isChatEnabled,
      isChatDelayed: values.isChatDelayed,
      isChatFollowersOnly: values.isChatFollowersOnly,
    };

    const stream = await db.stream.update({
      where: {
        id: selfStream.id,
      },
      data: {
        ...validData,
      },
    });

    revalidatePath("/");
    revalidatePath(`/${self.username}`);
    revalidatePath(`/u/${self.username}`);
    revalidatePath(`/u/${self.username}/chat`);

    return stream;
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};

export { updateStream };
