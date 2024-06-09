"use server";

import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import {
  CreateIngressOptions,
  IngressAudioEncodingPreset,
  IngressAudioOptions,
  IngressClient,
  IngressInput,
  IngressVideoEncodingPreset,
  IngressVideoOptions,
  RoomServiceClient,
  TrackSource,
} from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

// Livekit IngressVideoOptions/IngressAudioOptions have a prop called preset
// But despite it, Error // don't know why
// Therefore we have to extend it
interface ExtendedIngressVideoOptions extends IngressVideoOptions {
  preset: IngressVideoEncodingPreset;
}

interface ExtendedIngressAudioOptions extends IngressAudioOptions {
  preset: IngressAudioEncodingPreset;
}

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);
const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!);

const resetIngresses = async (hostIdentity: string) => {
  const ingresses = await ingressClient.listIngress({
    roomName: hostIdentity,
  });

  const rooms = await roomService.listRooms([hostIdentity]);

  for (const room of rooms) {
    await roomService.deleteRoom(room.name);
  }

  for (const ingress of ingresses) {
    if (ingress.ingressId) {
      await ingressClient.deleteIngress(ingress.ingressId);
    }
  }
};

const createIngress = async (ingressType: IngressInput) => {
  const self = await getSelf();

  await resetIngresses(self.id);

  const options: CreateIngressOptions = {
    name: self.username,
    roomName: self.id,
    participantName: self.username,
    participantIdentity: self.id,
  };

  if (ingressType === IngressInput.WHIP_INPUT) {
    options.enableTranscoding = true;
  } else {
    options.video = {
      source: TrackSource.CAMERA,
      preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
    } as ExtendedIngressVideoOptions;
    options.audio = {
      source: TrackSource.MICROPHONE,
      preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
    } as ExtendedIngressAudioOptions;
  }

  const ingress = await ingressClient.createIngress(ingressType, options);

  if (!ingress || !ingress.url || !ingress.streamKey)
    throw new Error("Failed to create ingress");

  await db.stream.update({
    where: {
      userId: self.id,
    },
    data: {
      ingressId: ingress.ingressId,
      streamKey: ingress.streamKey,
      serverUrl: ingress.url,
    },
  });

  revalidatePath(`/u/${self.username}/keys`);

  // Only plain objects, and a few built-ins, can be passed to Client Components
  // from Server Components. Classes or null prototypes are not supported
  // ingress contains instances of class, therefore, instead of return ingress:
  return JSON.parse(JSON.stringify(ingress));
};

export { createIngress, resetIngresses };
