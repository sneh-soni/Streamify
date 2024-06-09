import { headers } from "next/headers";
import { WebhookReceiver } from "livekit-server-sdk";
import { db } from "@/lib/db";

const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export async function POST(req: Request) {
  const body = await req.text();
  const headerPayload = headers();
  const authorization = headerPayload.get("Authorization");

  if (!authorization) {
    return new Response("No Authorization headers", { status: 400 });
  }

  const Event = receiver.receive(body, authorization);

  if ((await Event).event === "ingress_started") {
    const updatedStream = await db.stream.update({
      where: {
        ingressId: (await Event).ingressInfo?.ingressId,
      },
      data: {
        isLive: true,
      },
    });

    if (!updatedStream.isLive)
      return new Response("Error while starting stream", { status: 500 });
  }

  if ((await Event).event === "ingress_ended") {
    const updatedStream = await db.stream.update({
      where: {
        ingressId: (await Event).ingressInfo?.ingressId,
      },
      data: {
        isLive: false,
      },
    });

    if (updatedStream.isLive)
      return new Response("Error while ending stream", { status: 500 });
  }

  return new Response("Success", { status: 200 });
}
