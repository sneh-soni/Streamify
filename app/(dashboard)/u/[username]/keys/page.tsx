import { Button } from "@/components/ui/button";
import { Urlcard } from "./_components/url-card";
import { KeyCard } from "./_components/key-card";
import { getSelf } from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/stream-service";
import { ConnectModel } from "./_components/connect-model";

const KeysPage = async () => {
  const self = await getSelf();
  const stream = await getStreamByUserId(self.id);

  if (!stream) throw new Error("Stream not found");
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4 gap-x-4">
        <h1 className="text-2xl font-bold">Keys and URLs</h1>
        <ConnectModel />
      </div>
      <div className="space-y-4">
        <Urlcard value={stream.serverUrl} />
        <KeyCard value={stream.streamKey} />
      </div>
    </div>
  );
};

export default KeysPage;
